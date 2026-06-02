import { Button } from "@/components/ui/button";
import { ShieldCheck, Wrench, Truck, Award, Clock, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { bookingMessage, waHref } from "@/lib/contact";
import Image from "next/image";
import { QuickBookingBar } from "./QuickBookingBar";

const BADGES = [
  { icon: Clock, label: "Same Day Service" },
  { icon: Award, label: "Genuine Spare Parts" },
  { icon: ShieldCheck, label: "Service Warranty" },
  { icon: Wrench, label: "Expert Technicians" },
  { icon: Truck, label: "Doorstep Support" },
];

export function Hero() {
  return (
    <section className="dark relative overflow-hidden min-h-[720px] flex flex-col justify-center text-foreground">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#07090f]">
        <Image
          src="/hero-bg-2.png"
          alt="Premium washing machine background"
          fill
          className="object-cover object-right sm:object-center"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background from-10% via-background/80 via-45% to-transparent sm:via-background/50 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-8">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Trusted by 1,000+ homes in Tuticorin
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
              Washing Machine <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent drop-shadow-sm">Repair Experts</span> in Tuticorin
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Professional doorstep washing machine repair, installation, maintenance and
              deep cleaning for IFB, LG, Samsung, Bosch and Whirlpool — backed by genuine
              spare parts and a written service warranty.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-14 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_0_30px_-5px_rgba(0,87,255,0.4)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_40px_-5px_rgba(0,87,255,0.6)] active:scale-95"
              >
                <a href={waHref(bookingMessage({}))} target="_blank" rel="noreferrer">
                  Book Service <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-white/10 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
              >
                <a href={waHref(bookingMessage({}))} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="mr-2 h-5 w-5 text-[var(--whatsapp)] drop-shadow-sm" />
                  WhatsApp Now
                </a>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
              {BADGES.map((b) => (
                <li key={b.label} className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <b.icon className="h-3.5 w-3.5 text-accent" />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <QuickBookingBar />
        </div>
      </div>
    </section>
  );
}
