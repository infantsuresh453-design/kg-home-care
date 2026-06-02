import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <ScrollReveal distance={28} duration={650}>
            <header className={`mb-10 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
              {eyebrow && (
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
              )}
              {title && (
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
              )}
            </header>
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
}
