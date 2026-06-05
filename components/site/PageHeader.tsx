export function PageHeader({
  eyebrow, title, description,
}: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-radial-primary">
      {/* Dot grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[3px] border-primary/10" />
      <div className="pointer-events-none absolute right-12 top-12 h-20 w-20 rounded-full border-[3px] border-primary/15" />
      <div className="pointer-events-none absolute -left-8 bottom-4 h-32 w-32 rotate-12 rounded-xl border-[3px] border-blue-200/25" />
      <div className="pointer-events-none absolute left-1/3 -bottom-6 h-14 w-14 rotate-45 rounded-md border-[3px] border-indigo-300/20" />
      {/* Gradient orb */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-200/20 blur-[60px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
