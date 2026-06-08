import { Link, useParams } from "react-router-dom";
import { tripDays } from "../data/trip";
import { DayDetail } from "../components/DayDetail";
import { DayTabs } from "../components/DayTabs";
import { useNavigate } from "react-router-dom";

export function DayDetailPage() {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNum = Number(day);
  const plan = tripDays.find((d) => d.day === dayNum);

  if (!plan) {
    return (
      <div className="rounded-2xl bg-white shadow-card p-6 text-center">
        <p className="text-lg font-bold text-slate-900">
          존재하지 않는 일자입니다.
        </p>
        <Link
          to="/itinerary"
          className="inline-block mt-3 text-ocean-700 font-semibold"
        >
          전체 일정으로 돌아가기 →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DayTabs selected={dayNum} onSelect={(d) => navigate(`/itinerary/${d}`)} />
      <DayDetail plan={plan} />
    </div>
  );
}
