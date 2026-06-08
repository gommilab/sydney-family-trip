import type { DayPlan } from "../data/trip";
import { Timeline } from "./Timeline";
import { mapSearchUrl, dayThemeColor } from "../utils/format";

export function DayDetail({ plan }: { plan: DayPlan }) {
  return (
    <article className="space-y-4">
      {/* 헤더 */}
      <header className="rounded-2xl bg-white shadow-card overflow-hidden">
        <div className={`h-2 ${dayThemeColor(plan.day)}`} aria-hidden />
        <div className="p-5">
          <p className="text-sm font-semibold text-ocean-700">
            Day {plan.day} · {plan.weekday}
          </p>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mt-1 mb-3">
            {plan.title}
          </h1>
          <p className="text-sm text-slate-500 mb-3">{plan.theme}</p>
          <p className="text-base text-slate-700 leading-relaxed">
            {plan.summary}
          </p>
        </div>
      </header>

      {/* 오늘의 핵심 박스 */}
      <section className="rounded-2xl bg-ocean-50 border border-ocean-100 p-5">
        <h2 className="text-base font-bold text-ocean-700 mb-3">
          ✨ 오늘의 핵심
        </h2>
        <ul className="space-y-2 text-base text-slate-800 leading-relaxed">
          {plan.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-ocean-500 mt-1" aria-hidden>
                •
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 주요 지역 (지도 링크) */}
      <section className="rounded-2xl bg-white shadow-card p-5">
        <h2 className="text-base font-bold text-slate-900 mb-3">📍 주요 장소</h2>
        <div className="flex flex-wrap gap-2">
          {plan.areas.map((area) => (
            <a
              key={area}
              href={mapSearchUrl(`${area} Sydney`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm rounded-full bg-ocean-50 hover:bg-ocean-100 text-ocean-700 px-3 py-1.5 border border-ocean-100 transition"
            >
              <span>{area}</span>
              <span aria-hidden className="text-xs">↗</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">
          장소를 누르면 Google 지도에서 검색됩니다.
        </p>
      </section>

      {/* 시간대별 타임라인 */}
      <section className="rounded-2xl bg-white shadow-card p-5">
        <h2 className="text-base font-bold text-slate-900 mb-4">⏱️ 시간대별 일정</h2>
        <Timeline items={plan.timeline} />
      </section>
    </article>
  );
}
