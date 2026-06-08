import { tripDays } from "../data/trip";

export function DayTabs({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (day: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="여행 일차 선택"
      className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scroll-smooth"
    >
      {tripDays.map((d) => {
        const active = d.day === selected;
        return (
          <button
            key={d.day}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(d.day)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold border transition ${
              active
                ? "bg-ocean-600 text-white border-ocean-600 shadow"
                : "bg-white text-slate-700 border-slate-200 hover:border-ocean-300"
            }`}
          >
            Day {d.day}
            <span className="ml-1 font-normal opacity-80">·{d.weekday[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
