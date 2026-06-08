type TimelineItem = { time: string; activity: string };

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l-2 border-ocean-100 ml-3 pl-5 space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="relative">
          <span
            className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full bg-ocean-500 border-2 border-white shadow-sm"
            aria-hidden
          />
          <p className="text-sm font-semibold text-ocean-700">{item.time}</p>
          <p className="text-base text-slate-800 leading-relaxed mt-0.5">
            {item.activity}
          </p>
        </li>
      ))}
    </ol>
  );
}
