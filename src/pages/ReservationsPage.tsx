import { Link } from "react-router-dom";
import { reservations, statusStyle, vendorStyle } from "../data/reservations";
import { tripDays } from "../data/trip";

export function ReservationsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-4">
        <h2 className="text-lg font-bold text-slate-900">예약현황</h2>
        <p className="text-sm text-slate-500 mt-1">
          투어·크루즈·아쿠아리움 예약 상태와 예약처를 한눈에 확인하세요.
        </p>
      </section>

      <ul className="space-y-3">
        {reservations.map((r) => {
          const sStyle = statusStyle[r.status];
          const vStyle = r.vendor ? vendorStyle[r.vendor] : undefined;
          const day = r.day
            ? tripDays.find((d) => d.day === r.day)
            : undefined;
          return (
            <li key={r.id}>
              <article className="rounded-2xl bg-white border border-slate-200 shadow-card p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-bold text-slate-900 flex-1 leading-snug">
                    {r.name}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-xs font-bold rounded-full px-2.5 py-1 border ${sStyle.badge}`}
                  >
                    {sStyle.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {day && (
                    <Link
                      to={`/itinerary/${day.day}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ocean-700 bg-ocean-50 rounded-full px-2 py-0.5"
                    >
                      Day {day.day} · {day.weekday}
                      <span aria-hidden>›</span>
                    </Link>
                  )}
                  {vStyle && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 border ${vStyle.badge}`}
                    >
                      <span aria-hidden>🛒</span>
                      <span>예약처 · {vStyle.label}</span>
                    </span>
                  )}
                </div>

                {r.note && (
                  <p className="text-[14px] text-slate-700 leading-relaxed">
                    {r.note}
                  </p>
                )}
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-ocean-700 hover:text-ocean-800 underline underline-offset-2"
                  >
                    상품 상세 보기 ↗
                  </a>
                )}
              </article>
            </li>
          );
        })}
      </ul>

      <section className="rounded-2xl bg-ocean-50 border border-ocean-100 p-4">
        <p className="text-sm text-ocean-700">
          ℹ️ 예약 내용은
          <span className="font-mono mx-1 text-xs">src/data/reservations.ts</span>
          에서 직접 수정할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
