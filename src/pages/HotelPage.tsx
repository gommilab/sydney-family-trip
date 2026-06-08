import { hotelInfo } from "../data/hotel";
import { mapSearchUrl } from "../utils/format";

export function HotelPage() {
  const r = hotelInfo.reservation;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <p className="text-xs font-semibold tracking-wider text-ocean-600 uppercase">
          Accommodation
        </p>
        <h2 className="text-xl font-extrabold text-slate-900 mt-1">
          {hotelInfo.nameKo}
        </h2>
        {hotelInfo.nameEn && (
          <p className="text-sm text-slate-500">{hotelInfo.nameEn}</p>
        )}

        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500 mb-1">📍 주소</p>
          <p className="text-base font-bold text-slate-900">
            {hotelInfo.address}
          </p>
          <p className="text-sm text-slate-600 mt-1">{hotelInfo.addressEn}</p>
          <a
            href={mapSearchUrl(hotelInfo.address)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-ocean-700 font-semibold text-sm underline"
          >
            지도에서 보기 ↗
          </a>
        </div>
      </section>

      {/* 예약 확정 정보 */}
      <section className="rounded-2xl bg-white border-2 border-ocean-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span aria-hidden>📋</span> 예약 확정 정보
          </h3>
          <span className="text-[10px] font-bold text-leaf-500 bg-leaf-50 border border-leaf-200 rounded-full px-2 py-0.5">
            예약완료
          </span>
        </div>

        {/* 체크인/아웃 강조 카드 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <DateBlock label="체크인" date="6/27 (토)" sub={r.checkIn} />
          <DateBlock label="체크아웃" date="7/3 (금)" sub={r.checkOut} />
        </div>
        <p className="text-center text-xs text-slate-500 -mt-2 mb-4">
          총 {r.nights}박 {r.nights + 1}일
        </p>

        {/* 예약 상세 - 키 밸류 */}
        <dl className="text-sm space-y-2.5">
          {r.guestName && <Row label="예약자">{r.guestName}</Row>}
          <Row label="객실 타입">
            {r.roomType}
            {r.bedConfig && (
              <span className="block text-xs text-slate-500 mt-0.5">
                {r.bedConfig}
              </span>
            )}
          </Row>
          <Row label="인원">
            성인 {r.adults}명 · 객실 {r.rooms}개
          </Row>
          {r.totalAmount && (
            <Row label="총 요금">
              {r.totalAmount}
              <span className="block text-xs text-slate-500 mt-0.5">
                {r.paymentMethod}
              </span>
            </Row>
          )}
          {(r.agodaBookingId || r.referenceNo) && (
            <Row label="예약 번호">
              {r.agodaBookingId && (
                <span className="font-mono text-[13px]">
                  {r.agodaBookingId}
                </span>
              )}
              {r.referenceNo && (
                <span className="block text-xs text-slate-500 mt-0.5">
                  참조: <span className="font-mono">{r.referenceNo}</span>
                </span>
              )}
            </Row>
          )}
          {r.memberId && (
            <Row label="회원 ID">
              <span className="font-mono text-[13px]">{r.memberId}</span>
            </Row>
          )}
        </dl>

      </section>

      {/* 요청 사항 / 포함 시설 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <span aria-hidden>✅</span> 객실 요청 / 포함 시설
        </h3>

        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-1.5">
            객실 선호
          </p>
          <div className="flex flex-wrap gap-1.5">
            {r.preferences.map((p) => (
              <span
                key={p}
                className="text-xs rounded-full bg-ocean-50 text-ocean-700 px-2.5 py-1 border border-ocean-100"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-1.5">
            포함 시설
          </p>
          <div className="flex flex-wrap gap-1.5">
            {r.amenities.map((a) => (
              <span
                key={a}
                className="text-xs rounded-full bg-leaf-50 text-leaf-500 px-2.5 py-1 border border-leaf-200"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {r.arrivalTimeRequest && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-500 mb-1">
              도착 시간 요청
            </p>
            <p className="text-sm text-slate-800">{r.arrivalTimeRequest}</p>
          </div>
        )}

        {r.additionalRequest && (
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              추가 요청
            </p>
            <p className="text-sm text-slate-800 leading-relaxed">
              {r.additionalRequest}
            </p>
          </div>
        )}
      </section>

      {/* 취소 정책 */}
      <section className="rounded-2xl bg-warn-50 border border-warn-200 p-4">
        <p className="text-xs font-bold text-warn-500 mb-1">
          ⚠️ 취소 정책
        </p>
        <p className="text-sm text-slate-800 leading-relaxed">
          {r.cancellationPolicy}
        </p>
      </section>

      {/* 체크인 / 체크아웃 / 공항 이동 메모 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5 space-y-4">
        <MemoRow icon="🛎️" title="체크인" body={hotelInfo.checkInNote} />
        <MemoRow icon="🧳" title="체크아웃" body={hotelInfo.checkOutNote} />
        <MemoRow icon="✈️" title="공항 이동" body={hotelInfo.airportNote} />
        {hotelInfo.amenitiesNote && (
          <MemoRow icon="🛒" title="주변 편의시설" body={hotelInfo.amenitiesNote} />
        )}
      </section>

      {/* 택시 기사에게 보여줄 문구 */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 px-1">
          🚖 택시 기사에게 보여줄 문구
        </h3>
        {hotelInfo.taxiPhrases.map((p) => (
          <article
            key={p.label}
            className="rounded-2xl bg-white border-2 border-ocean-200 shadow-card p-5"
          >
            <p className="text-xs font-semibold text-ocean-600 mb-1">
              {p.label}
            </p>
            <p className="text-[22px] font-extrabold text-slate-900 leading-snug">
              {p.en}
            </p>
            <p className="text-sm text-slate-500 mt-2">{p.ko}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-ocean-50 border border-ocean-100 p-4">
        <p className="text-sm text-ocean-700">
          ℹ️ 호텔 정보는
          <span className="font-mono mx-1 text-xs">src/data/hotel.ts</span>
          에서 수정할 수 있습니다.
        </p>
      </section>
    </div>
  );
}

function DateBlock({
  label,
  date,
  sub,
}: {
  label: string;
  date: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-ocean-50 border border-ocean-200 p-3 text-center">
      <p className="text-[11px] font-semibold text-ocean-600">{label}</p>
      <p className="text-xl font-extrabold text-ocean-700 leading-tight mt-1">
        {date}
      </p>
      <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 items-baseline border-b border-slate-100 pb-2 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="text-slate-800">{children}</dd>
    </div>
  );
}

function MemoRow({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-[15px] text-slate-700 leading-relaxed mt-0.5">
          {body}
        </p>
      </div>
    </div>
  );
}
