/**
 * 호텔 예약 개인정보 (PII) — 환경변수에서만 읽습니다.
 *
 * - 로컬 개발: `.env.local` 의 VITE_HOTEL_* 값들 (이 파일은 .gitignore 처리)
 * - 운영 배포: Vercel 대시보드의 Environment Variables 에 동일 키 등록
 *
 * 어떤 키도 소스코드에 하드코딩되지 않습니다. 키가 없으면 빈 문자열을
 * 반환하므로 UI/AI 응답이 자연스럽게 해당 필드를 숨깁니다.
 *
 * Vite 가 `VITE_*` 프리픽스만 클라이언트 번들에 노출하므로 키 이름은
 * 반드시 `VITE_HOTEL_*` 로 시작해야 합니다. (값은 빌드 시 클라이언트 JS 에
 * 인라인되며 가족이 앱에서 보게 됩니다 — public 소스에 들어가지 않는
 * 것이 목적입니다.)
 */

function readEnv(name: string): string {
  // 1) Vite 클라이언트/SSR 빌드: import.meta.env 에 인라인된 값
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (import.meta as any)?.env as
      | Record<string, string | undefined>
      | undefined;
    if (env) {
      const v = env[name];
      if (typeof v === "string" && v.length > 0) return v;
    }
  } catch {
    // import.meta.env 가 정의되지 않은 환경 — 다음으로 폴백
  }
  // 2) Node 서버 (Vercel API 서버리스, vite dev SSR): process.env
  if (typeof process !== "undefined" && process.env) {
    const v = process.env[name];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return "";
}

export const hotelPrivate = {
  guestName: readEnv("VITE_HOTEL_GUEST_NAME"),
  memberId: readEnv("VITE_HOTEL_MEMBER_ID"),
  agodaBookingId: readEnv("VITE_HOTEL_AGODA_BOOKING_ID"),
  referenceNo: readEnv("VITE_HOTEL_REFERENCE_NO"),
  totalAmount: readEnv("VITE_HOTEL_TOTAL_AMOUNT"),
};

export const hasAnyPrivateHotelData = Object.values(hotelPrivate).some(
  (v) => v.length > 0
);
