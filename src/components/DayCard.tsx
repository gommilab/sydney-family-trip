import { Link } from "react-router-dom";
import type { DayPlan } from "../data/trip";
import { dayThemeColor } from "../utils/format";

const dayIcon: Record<number, string> = {
  1: "✈️",
  2: "🌆",
  3: "🏔️",
  4: "🌊",
  5: "🛍️",
  6: "🐋",
  7: "🛬",
};

export function DayCard({ plan }: { plan: DayPlan }) {
  return (
    <Link
      to={`/itinerary/${plan.day}`}
      className="block rounded-2xl bg-white shadow-card overflow-hidden active:scale-[0.99] transition"
    >
      <div className={`h-2 w-full ${dayThemeColor(plan.day)}`} aria-hidden />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" aria-hidden>
            {dayIcon[plan.day] ?? "📅"}
          </span>
          <div>
            <p className="text-sm text-slate-500">
              Day {plan.day} · {plan.weekday}
            </p>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {plan.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-3">{plan.theme}</p>

        <p className="text-base text-slate-700 leading-relaxed mb-3">
          {plan.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {plan.areas.slice(0, 4).map((area) => (
            <span
              key={area}
              className="text-xs rounded-full bg-ocean-50 text-ocean-700 px-2.5 py-1 border border-ocean-100"
            >
              {area}
            </span>
          ))}
          {plan.areas.length > 4 && (
            <span className="text-xs text-slate-500 self-center">
              외 {plan.areas.length - 4}곳
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-3 mt-1">
          <span className="text-sm text-slate-500">상세 보기</span>
          <span
            aria-hidden
            className="text-ocean-600 text-lg font-bold"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
