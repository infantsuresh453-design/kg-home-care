import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="KG Home Care home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-bold shadow-lift">
        KG
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-foreground">KG Home Care</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Washing Machine Experts
        </span>
      </span>
    </Link>
  );
}
