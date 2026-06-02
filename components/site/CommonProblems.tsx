import {
  Power, Droplets, RefreshCw, Volume2, Lock, Disc3, CircuitBoard, Cog,
} from "lucide-react";

const PROBLEMS = [
  { icon: Power,        title: "Machine Not Starting", desc: "Power, start switch or PCB issue.",  color: "bg-red-50 text-red-500",       hover: "group-hover:bg-red-500 group-hover:text-white",     blob: "group-hover:bg-red-100",     ring: "ring-red-100"    },
  { icon: Droplets,     title: "Water Leakage",        desc: "Hose, gasket or tub seal failure.",  color: "bg-blue-50 text-blue-500",     hover: "group-hover:bg-blue-500 group-hover:text-white",    blob: "group-hover:bg-blue-100",    ring: "ring-blue-100"   },
  { icon: RefreshCw,    title: "No Spin",              desc: "Belt, capacitor or balance error.",  color: "bg-violet-50 text-violet-500", hover: "group-hover:bg-violet-500 group-hover:text-white",  blob: "group-hover:bg-violet-100",  ring: "ring-violet-100" },
  { icon: Volume2,      title: "Excessive Noise",      desc: "Bearings, drum or shock absorbers.", color: "bg-orange-50 text-orange-500", hover: "group-hover:bg-orange-500 group-hover:text-white",  blob: "group-hover:bg-orange-100",  ring: "ring-orange-100" },
  { icon: Lock,         title: "Door Lock Issue",      desc: "Interlock, latch or door switch.",   color: "bg-amber-50 text-amber-600",   hover: "group-hover:bg-amber-500 group-hover:text-white",   blob: "group-hover:bg-amber-100",   ring: "ring-amber-100"  },
  { icon: Disc3,        title: "Drum Not Rotating",    desc: "Motor coupling or drive belt.",       color: "bg-teal-50 text-teal-600",     hover: "group-hover:bg-teal-500 group-hover:text-white",    blob: "group-hover:bg-teal-100",    ring: "ring-teal-100"   },
  { icon: CircuitBoard, title: "PCB Failure",          desc: "Display errors or no response.",      color: "bg-pink-50 text-pink-500",     hover: "group-hover:bg-pink-500 group-hover:text-white",    blob: "group-hover:bg-pink-100",    ring: "ring-pink-100"   },
  { icon: Cog,          title: "Motor Problem",        desc: "Motor rewinding or replacement.",     color: "bg-indigo-50 text-indigo-500", hover: "group-hover:bg-indigo-500 group-hover:text-white",  blob: "group-hover:bg-indigo-100",  ring: "ring-indigo-100" },
];

export function CommonProblems() {
  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      {PROBLEMS.map(({ icon: Icon, title, desc, color, hover, blob, ring }) => (
        <div
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
        >
          {/* decorative blob */}
          <div className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-slate-50 opacity-80 transition-all duration-500 group-hover:scale-110 ${blob}`} />

          <span className={`relative mb-3 grid h-9 w-9 place-items-center rounded-xl ring-1 transition-colors duration-300 ${color} ${ring} ${hover}`}>
            <Icon className="h-[16px] w-[16px]" />
          </span>

          <p className="relative text-xs font-semibold text-slate-800 sm:text-sm">{title}</p>
          <p className="relative mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">{desc}</p>
        </div>
      ))}
    </div>
  );
}
