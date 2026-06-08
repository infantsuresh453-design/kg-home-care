"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import {
  DEFAULT_ACTION_STATE,
  parseFaqText,
  parseTestimonialsText,
  slugify,
} from "@/lib/cms";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type ActionState = {
  success: boolean;
  message: string;
};

function ensureConfigured() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase is not configured.");
  }
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readNullableString(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value || null;
}

async function uploadImage(folder: string, slug: string, file: File) {
  if (!file || file.size === 0) return null;

  const supabase = await createServerSupabaseClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from("images").upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

async function deleteImage(imageUrl: string | null | undefined) {
  if (!imageUrl) return;

  const marker = "/storage/v1/object/public/images/";
  const index = imageUrl.indexOf(marker);
  if (index === -1) return;

  const filePath = imageUrl.slice(index + marker.length);
  if (!filePath) return;

  const supabase = await createServerSupabaseClient();
  await supabase.storage.from("images").remove([filePath]);
}

function revalidateServices(slug?: string) {
  updateTag("services");
  revalidatePath("/dashboard/services");
  revalidatePath("/services");
  if (slug) {
    revalidatePath(`/services/${slug}`);
  }
}

function revalidateSeoPages(slug?: string) {
  updateTag("seo-pages");
  revalidatePath("/dashboard/seo-pages");
  if (slug) {
    revalidatePath(`/${slug}`);
  }
}

function revalidateLeads() {
  updateTag("leads");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
}

export async function signOutAdmin() {
  ensureConfigured();
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createLeadAction(
  _prevState: ActionState = DEFAULT_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "Lead storage is not configured yet. Please add Supabase environment variables first.",
    };
  }
  const name = readString(formData, "name");
  const phone = readString(formData, "phone");

  if (!name || !phone) {
    return {
      success: false,
      message: "Name and phone are required.",
    };
  }

  const email = readNullableString(formData, "email");
  const service = readNullableString(formData, "service");
  const brand = readNullableString(formData, "brand");
  const location = readNullableString(formData, "location");
  const message = readNullableString(formData, "message");

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    email,
    service,
    brand,
    location,
    message,
    status: "New",
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateLeads();

  // Build WhatsApp redirect URL with lead info
  const WHATSAPP_RAW = "918778838405";
  const lines = [
    "Hi KG Home Care, I'd like to book a washing machine service.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    location ? `Location: ${location}` : null,
    service ? `Service: ${service}` : null,
    brand ? `Brand: ${brand}` : null,
    message ? `Issue: ${message}` : null,
  ].filter(Boolean);
  const waMessage = lines.join("\n");
  const waUrl = `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(waMessage)}`;

  return {
    success: true,
    message: waUrl,
  };
}

export async function updateLeadStatusAction(id: string, formData: FormData) {
  ensureConfigured();
  await requireAdminSession();

  const status = readString(formData, "status");
  const supabase = await createServerSupabaseClient();
  await supabase.from("leads").update({ status }).eq("id", id);

  revalidateLeads();
  revalidatePath(`/dashboard/leads/${id}`);
}

export async function deleteLeadAction(id: string) {
  ensureConfigured();
  await requireAdminSession();

  const supabase = await createServerSupabaseClient();
  await supabase.from("leads").delete().eq("id", id);

  revalidateLeads();
  redirect("/dashboard/leads");
}

export async function createServiceAction(
  _prevState: ActionState = DEFAULT_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  ensureConfigured();
  await requireAdminSession();

  const name = readString(formData, "name");
  const slug = readString(formData, "slug") || slugify(name);

  if (!name || !slug) {
    return {
      success: false,
      message: "Name and slug are required.",
    };
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await uploadImage("services", slug, imageFile)
      : null;

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("services").insert({
    name,
    slug,
    icon: readNullableString(formData, "icon"),
    status: readString(formData, "status") || "Active",
    description: readNullableString(formData, "description"),
    content: readNullableString(formData, "content"),
    image_url: imageUrl,
    meta_title: readNullableString(formData, "meta_title"),
    meta_description: readNullableString(formData, "meta_description"),
    keywords: readNullableString(formData, "keywords"),
    other_tags: readNullableString(formData, "other_tags"),
  });

  if (error) {
    if (imageUrl) await deleteImage(imageUrl);
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateServices(slug);

  return {
    success: true,
    message: "Service created successfully.",
  };
}

export async function updateServiceAction(
  id: string,
  _prevState: ActionState = DEFAULT_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  ensureConfigured();
  await requireAdminSession();

  const name = readString(formData, "name");
  const slug = readString(formData, "slug") || slugify(name);
  const existingImageUrl = readNullableString(formData, "existing_image_url");
  const shouldRemoveImage = readString(formData, "remove_image") === "true";
  const imageFile = formData.get("image") as File | null;

  let imageUrl = existingImageUrl;

  if (shouldRemoveImage && existingImageUrl) {
    await deleteImage(existingImageUrl);
    imageUrl = null;
  }

  if (imageFile && imageFile.size > 0) {
    if (existingImageUrl) await deleteImage(existingImageUrl);
    imageUrl = await uploadImage("services", slug, imageFile);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("services")
    .update({
      name,
      slug,
      icon: readNullableString(formData, "icon"),
      status: readString(formData, "status") || "Active",
      description: readNullableString(formData, "description"),
      content: readNullableString(formData, "content"),
      image_url: imageUrl,
      meta_title: readNullableString(formData, "meta_title"),
      meta_description: readNullableString(formData, "meta_description"),
      keywords: readNullableString(formData, "keywords"),
      other_tags: readNullableString(formData, "other_tags"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateServices(slug);

  return {
    success: true,
    message: "Service updated successfully.",
  };
}

export async function deleteServiceAction(id: string, imageUrl?: string | null, slug?: string) {
  ensureConfigured();
  await requireAdminSession();

  if (imageUrl) {
    await deleteImage(imageUrl);
  }

  const supabase = await createServerSupabaseClient();
  await supabase.from("services").delete().eq("id", id);

  revalidateServices(slug);
}

export async function duplicateServiceAction(id: string) {
  ensureConfigured();
  await requireAdminSession();

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).single();

  if (!data) return;

  const name = `${data.name} Copy`;
  const slug = `${data.slug}-copy-${Date.now().toString().slice(-4)}`;

  await supabase.from("services").insert({
    ...data,
    id: undefined,
    name,
    slug,
    status: "Inactive",
    created_at: undefined,
    updated_at: undefined,
  });

  revalidateServices(slug);
}

export async function createSeoPageAction(
  _prevState: ActionState = DEFAULT_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  ensureConfigured();
  await requireAdminSession();

  const title = readString(formData, "title");
  const heading = readString(formData, "heading");
  const slug = readString(formData, "slug") || slugify(title || heading);

  if (!title || !slug) {
    return {
      success: false,
      message: "Title and slug are required.",
    };
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await uploadImage("seo-pages", slug, imageFile)
      : null;

  // Section 2 image
  const section2ImageFile = formData.get("section2_image") as File | null;
  const section2ImageUrl =
    section2ImageFile && section2ImageFile.size > 0
      ? await uploadImage("seo-pages", `${slug}-s2`, section2ImageFile)
      : null;

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("seo_pages").insert({
    title,
    slug,
    meta_title: readNullableString(formData, "meta_title"),
    meta_description: readNullableString(formData, "meta_description"),
    keywords: readNullableString(formData, "keywords"),
    location: readNullableString(formData, "location"),
    heading,
    subheading: readNullableString(formData, "subheading"),
    content: readNullableString(formData, "content"),
    cta_text: readNullableString(formData, "cta_text"),
    cta_link: readNullableString(formData, "cta_link"),
    status: readString(formData, "status") || "Draft",
    template: readString(formData, "template") || "default",
    image_url: imageUrl,
    section2_heading: readNullableString(formData, "section2_heading"),
    section2_subheading: readNullableString(formData, "section2_subheading"),
    section2_content: readNullableString(formData, "section2_content"),
    section2_image_url: section2ImageUrl,
    section3_heading: readNullableString(formData, "section3_heading"),
    section3_content: readNullableString(formData, "section3_content"),
    section4_heading: readNullableString(formData, "section4_heading"),
    section4_content: readNullableString(formData, "section4_content"),
    faq: parseFaqText(readString(formData, "faq_text")),
    testimonials: parseTestimonialsText(readString(formData, "testimonials_text")),
    other_tags: readNullableString(formData, "other_tags"),
  });

  if (error) {
    if (imageUrl) await deleteImage(imageUrl);
    if (section2ImageUrl) await deleteImage(section2ImageUrl);
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateSeoPages(slug);

  return {
    success: true,
    message: "SEO page created successfully.",
  };
}

export async function updateSeoPageAction(
  id: string,
  _prevState: ActionState = DEFAULT_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  ensureConfigured();
  await requireAdminSession();

  const title = readString(formData, "title");
  const heading = readString(formData, "heading");
  const slug = readString(formData, "slug") || slugify(title || heading);
  const existingImageUrl = readNullableString(formData, "existing_image_url");
  const shouldRemoveImage = readString(formData, "remove_image") === "true";
  const imageFile = formData.get("image") as File | null;

  let imageUrl = existingImageUrl;

  if (shouldRemoveImage && existingImageUrl) {
    await deleteImage(existingImageUrl);
    imageUrl = null;
  }

  if (imageFile && imageFile.size > 0) {
    if (existingImageUrl) await deleteImage(existingImageUrl);
    imageUrl = await uploadImage("seo-pages", slug, imageFile);
  }

  // Section 2 image handling
  const existingSection2ImageUrl = readNullableString(formData, "existing_section2_image_url");
  const shouldRemoveSection2Image = readString(formData, "remove_section2_image") === "true";
  const section2ImageFile = formData.get("section2_image") as File | null;

  let section2ImageUrl = existingSection2ImageUrl;

  if (shouldRemoveSection2Image && existingSection2ImageUrl) {
    await deleteImage(existingSection2ImageUrl);
    section2ImageUrl = null;
  }

  if (section2ImageFile && section2ImageFile.size > 0) {
    if (existingSection2ImageUrl) await deleteImage(existingSection2ImageUrl);
    section2ImageUrl = await uploadImage("seo-pages", `${slug}-s2`, section2ImageFile);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("seo_pages")
    .update({
      title,
      slug,
      meta_title: readNullableString(formData, "meta_title"),
      meta_description: readNullableString(formData, "meta_description"),
      keywords: readNullableString(formData, "keywords"),
      location: readNullableString(formData, "location"),
      heading,
      subheading: readNullableString(formData, "subheading"),
      content: readNullableString(formData, "content"),
      cta_text: readNullableString(formData, "cta_text"),
      cta_link: readNullableString(formData, "cta_link"),
      status: readString(formData, "status") || "Draft",
      template: readString(formData, "template") || "default",
      image_url: imageUrl,
      section2_heading: readNullableString(formData, "section2_heading"),
      section2_subheading: readNullableString(formData, "section2_subheading"),
      section2_content: readNullableString(formData, "section2_content"),
      section2_image_url: section2ImageUrl,
      section3_heading: readNullableString(formData, "section3_heading"),
      section3_content: readNullableString(formData, "section3_content"),
      section4_heading: readNullableString(formData, "section4_heading"),
      section4_content: readNullableString(formData, "section4_content"),
      faq: parseFaqText(readString(formData, "faq_text")),
      testimonials: parseTestimonialsText(readString(formData, "testimonials_text")),
      other_tags: readNullableString(formData, "other_tags"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateSeoPages(slug);

  return {
    success: true,
    message: "SEO page updated successfully.",
  };
}

export async function deleteSeoPageAction(id: string, imageUrl?: string | null, slug?: string) {
  ensureConfigured();
  await requireAdminSession();

  if (imageUrl) {
    await deleteImage(imageUrl);
  }

  const supabase = await createServerSupabaseClient();
  await supabase.from("seo_pages").delete().eq("id", id);

  revalidateSeoPages(slug);
}
