import { tripDays } from "../data/trip";
import { ScheduleDayCard } from "./ScheduleDayCard";

type Props = {
  /** 한 번에 하나의 Day만 펼침. null 이면 전부 접힘. */
  expandedDay: number | null;
  onToggle: (day: number) => void;
};

/**
 * 홈의 핵심 영역: Day 1~7 요약 + 펼침 상세.
 * expandedDay 상태는 HomePage 에서 소유한다.
 */
export function ScheduleSummaryList({ expandedDay, onToggle }: Props) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 mb-2.5">
        여행 일정
      </h2>
      <ul className="space-y-3">
        {tripDays.map((d) => (
          <li key={d.day}>
            <ScheduleDayCard
              plan={d}
              expanded={expandedDay === d.day}
              onToggle={() => onToggle(d.day)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
