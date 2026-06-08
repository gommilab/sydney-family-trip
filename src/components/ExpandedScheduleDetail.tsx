import type { DayPlan } from "../data/trip";
import { Timeline } from "./Timeline";

/**
 * 전체 일정 요약 리스트에서 펼쳐졌을 때 보여주는 상세 카드박스.
 * - 시간대별 일정
 * - 오늘의 코스
 * - 일정 포인트
 * - 부모님 동반 팁
 * - 컨디션이 안 좋을 때 대안
 */
export function ExpandedScheduleDetail({
  plan,
  onCollapse,
}: {
  plan: DayPlan;
  onCollapse: () => void;
}) {
  return (
    <div className="mt-2 rounded-2xl bg-ocean-50/60 border border-ocean-200 overflow-hidden">
      {/* 위 카드와 연결되어 보이는 노치 */}
      <div className="h-1 w-12 bg-ocean-300 rounded-b-full mx-auto" aria-hidden />

      <div className="p-5 space-y-5">
        {/* 시간대별 일정 */}
        <Section title="시간대별 일정" icon="⏱️">
          <Timeline items={plan.timeline} />
        </Section>

        {/* 오늘의 코스 */}
        <Section title="오늘의 코스" icon="🗺️">
          <RouteFlow steps={plan.routeSummary} />
        </Section>

        {/* 일정 포인트 */}
        {plan.highlights.length > 0 && (
          <Section title="일정 포인트" icon="✨">
            <BulletList
              items={plan.highlights}
              bulletClass="text-ocean-500"
            />
          </Section>
        )}

        {/* 부모님 동반 팁 */}
        {plan.tips.length > 0 && (
          <Section title="부모님 동반 팁" icon="👵">
            <BulletList
              items={plan.tips}
              bulletClass="text-warn-400"
            />
          </Section>
        )}

        {/* 대안 일정 */}
        {plan.alternatives.length > 0 && (
          <Section title="컨디션이 안 좋을 때 대안" icon="🌧️">
            <BulletList
              items={plan.alternatives}
              bulletClass="text-sand-500"
            />
          </Section>
        )}

        {/* 접기 버튼 */}
        <button
          type="button"
          onClick={onCollapse}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-ocean-200 bg-white hover:bg-ocean-50 text-ocean-700 font-semibold text-sm py-2.5 transition"
        >
          <span>상세일정 접기</span>
          <span aria-hidden>↑</span>
        </button>
      </div>
    </div>
  );
}

function RouteFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap gap-y-2 items-center text-sm">
      {steps.map((step, idx) => (
        <li key={`${step}-${idx}`} className="flex items-center">
          <span className="inline-flex items-center rounded-full bg-white text-ocean-700 border border-ocean-200 px-2.5 py-1 font-semibold shadow-sm">
            {step}
          </span>
          {idx < steps.length - 1 && (
            <span
              className="mx-1.5 text-slate-300 font-bold"
              aria-hidden
            >
              ›
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
        <span aria-hidden>{icon}</span> {title}
      </h4>
      {children}
    </div>
  );
}

function BulletList({
  items,
  bulletClass,
}: {
  items: string[];
  bulletClass: string;
}) {
  return (
    <ul className="space-y-1.5 text-[15px] text-slate-800 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={`${bulletClass} mt-1.5 text-xs`} aria-hidden>
            ●
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}
