import { MessageCircle, Phone, Home, ShieldCheck } from "lucide-react";

const STEPS = [
  { icon: MessageCircle, action: "Book",       desc: "WhatsApp or call in 2 min",       time: "2 minutes",       num: 1 },
  { icon: Phone,         action: "Confirm",    desc: "We call back to confirm your slot", time: "We call back",   num: 2 },
  { icon: Home,          action: "We Arrive",  desc: "Certified technician at your door", time: "Same day",       num: 3 },
  { icon: ShieldCheck,   action: "Fixed",      desc: "Repair done with genuine parts",    time: "90-day warranty", num: 4 },
];

export function HowItWorks() {
  return (
    <div className="relative">
      {/* connecting line — desktop */}
      <div aria-hidden className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-primary/15 md:block" />

      <ol className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {STEPS.map(({ icon: Icon, action, desc, time, num }) => (
          <li key={action} className="flex flex-col items-center text-center">
            <span className="relative z-10 mb-4 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-primary text-white shadow-[0_6px_20px_-4px_rgba(0,87,255,0.4)]">
              <Icon className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-primary text-[9px] font-black">
                {num}
              </span>
            </span>
            <p className="text-sm font-extrabold text-slate-900">{action}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
            <span className="mt-2 rounded-full bg-primary/8 px-2.5 py-0.5 text-[10px] font-bold text-primary">
              {time}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
