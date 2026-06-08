import type { DayPlan } from "../data/trip";
import { ExpandedScheduleDetail } from "./ExpandedScheduleDetail";

type Props = {
  plan: DayPlan;
  expanded: boolean;
  onToggle: () => void;
};

/**
 * 여행 일정 리스트의 한 항목.
 * 기본은 요약 표시, 펼치면 아래에 ExpandedScheduleDetail 가 렌더링된다.
 * 펼치기/접기 버튼은 카드 오른쪽에 세로형(텍스트 2줄 + 화살표) 으로 배치된다.
 */
export function ScheduleDayCard({ plan, expanded, onToggle }: Props) {
  return (
    <div className="scroll-mt-20">
      <article className="rounded-2xl bg-white border border-slate-200 shadow-card transition">
        <div className="flex items-stretch gap-3 p-4">
          {/* 날짜 컬럼 — 날짜 위, 요일 아래 */}
          <div className="flex-shrink-0 w-14 text-center pt-0.5">
            <p className="text-base font-extrabold text-ocean-700 leading-tight">
              {plan.date ?? `D${plan.day}`}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
              {plan.weekday}
            </p>
          </div>

          {/* 주요 일정 내용 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-slate-900 leading-snug">
              Day{plan.day} : {plan.title}
            </h3>
            <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
              {plan.shortSummary}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-semibold text-slate-600">주요 지역</span>{" "}
              · {plan.areas.slice(0, 4).join(", ")}
            </p>
          </div>

          {/* 우측 펼치기/접기 버튼 (텍스트 2줄 + 화살표) */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`schedule-detail-${plan.day}`}
            aria-label={expanded ? "상세일정 접기" : "상세일정 펼치기"}
            className="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 rounded-xl border border-ocean-200 bg-ocean-50 hover:bg-ocean-100 text-ocean-700 px-2.5 py-2 min-w-[64px] transition"
          >
            <span className="text-[11px] font-bold leading-tight">
              상세일정
            </span>
            <span className="text-[11px] font-bold leading-tight">
              {expanded ? "접기" : "펼치기"}
            </span>
            <span aria-hidden className="text-base leading-none mt-0.5">
              {expanded ? "↑" : "↓"}
            </span>
          </button>
        </div>
      </article>

      {expanded && (
        <div id={`schedule-detail-${plan.day}`}>
          <ExpandedScheduleDetail plan={plan} onCollapse={onToggle} />
        </div>
      )}
    </div>
  );
}
