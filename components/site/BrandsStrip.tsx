import Image from "next/image";

const BRANDS = [
  { name: "IFB",       src: "/logos/IFBIND.png",    width: 80,  height: 40 },
  { name: "LG",        src: "/logos/LG-Logo.webp",  width: 72,  height: 40 },
  { name: "Samsung",   src: "/logos/samsung.png",   width: 110, height: 40 },
  { name: "Bosch",     src: "/logos/Bosch.png",     width: 90,  height: 40 },
  { name: "Whirlpool", src: "/logos/Whirlpool.svg", width: 110, height: 40 },
];

export function BrandsStrip() {
  return (
    <div className="space-y-8">
      <p className="text-center text-sm font-medium text-slate-500">
        We use genuine spare parts for all major brands.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {BRANDS.map((b) => (
          <div
            key={b.name}
            className="group flex h-20 items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 shadow-[0_1px_8px_-2px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#185FA5]/20 hover:shadow-[0_6px_20px_-4px_rgba(24,95,165,0.12)]"
          >
            <Image
              src={b.src}
              alt={`${b.name} authorised service`}
              width={b.width}
              height={b.height}
              className="max-h-10 w-auto object-contain transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
