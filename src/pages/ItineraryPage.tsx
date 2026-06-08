import { tripDays } from "../data/trip";
import { DayCard } from "../components/DayCard";

export function ItineraryPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white shadow-card p-4">
        <h2 className="text-lg font-bold text-slate-900">전체 일정</h2>
        <p className="text-sm text-slate-500 mt-1">
          카드를 누르면 시간대별 상세 일정을 볼 수 있어요.
        </p>
      </section>
      <ul className="space-y-3">
        {tripDays.map((d) => (
          <li key={d.day}>
            <DayCard plan={d} />
          </li>
        ))}
      </ul>
    </div>
  );
}
