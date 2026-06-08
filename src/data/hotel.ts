import { hotelPrivate } from "./hotelPrivate";

export type HotelReservation = {
  /** Agoda 예약 번호 — PII (환경변수 주입, 비공개) */
  agodaBookingId: string;
  /** Agoda 예약 참조 번호 (= Booking.com booking ID) — PII */
  referenceNo: string;
  /** 예약자 이름 (영문) — PII */
  guestName: string;
  /** Agoda 회원 ID — PII */
  memberId: string;
  /** 체크인 날짜 (YYYY-MM-DD) */
  checkIn: string;
  /** 체크아웃 날짜 (YYYY-MM-DD) */
  checkOut: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  /** 객실 타입 */
  roomType: string;
  /** 침대 구성 */
  bedConfig?: string;
  /** 총 결제 예정 금액 (호텔 현장 결제) — PII */
  totalAmount: string;
  paymentMethod: string;
  /** 포함된 서비스/시설 */
  amenities: string[];
  /** 예약 시 요청 사항 (금연/고층/트윈/조용한 객실 등) */
  preferences: string[];
  /** 도착 예정 시간 요청 */
  arrivalTimeRequest?: string;
  /** 추가 메모 (얼리 체크인, 짐 보관 등) */
  additionalRequest?: string;
  /** 취소 정책 요약 */
  cancellationPolicy: string;
};

export type HotelInfo = {
  nameKo: string;
  nameEn?: string;
  address: string;
  addressEn: string;
  checkInNote: string;
  checkOutNote: string;
  airportNote: string;
  amenitiesNote?: string;
  reservation: HotelReservation;
  taxiPhrases: { label: string; en: string; ko: string }[];
};

/**
 * 호텔 정보.
 * - 공개 가능한 정보 (호텔명, 주소, 일정·인원·요청·정책 등) 는 이 파일에 직접 작성.
 * - 개인 식별 정보 (예약자명·회원ID·예약번호·금액) 는 `hotelPrivate` 에서 주입.
 *   `hotelPrivate` 는 환경변수에서만 읽으며 소스에 하드코딩되지 않습니다.
 */
export const hotelInfo: HotelInfo = {
  nameKo: "메리톤 스위트 켄트 스트리트",
  nameEn: "Meriton Suites Kent Street",
  address: "528 Kent Street, Sydney CBD, Sydney, Australia, 2000",
  addressEn: "528 Kent Street, Sydney NSW 2000, Australia",
  checkInNote:
    "체크인: 2026-06-27 (토). 시드니 공항 06:20 새벽 도착 후 픽업 투어(3시간) → 11:00 전후 호텔 도착. 정식 체크인은 보통 14:00~15:00 이므로, 얼리 체크인 가능 여부 확인 또는 호텔에 짐 보관 요청 후 첫날 일정 진행.",
  checkOutNote:
    "체크아웃: 2026-07-03 (금) 04:30 새벽 체크아웃. 07:55 시드니 출발편이므로 새벽 체크아웃 절차(24시간 프런트 / 키 드롭) 사전 확인 필수. Day 6(7/2) 밤에 짐 정리 완료 + 22시 이전 취침.",
  airportNote:
    "공항 → 숙소(Day 1): 06:20 도착 후 픽업 투어로 자연스럽게 이동. 숙소 → 공항(Day 7): 07:55 새벽 출발이므로 04:30 체크아웃 → 04:45 택시 → 05:00~05:15 공항 도착. 새벽 택시 사전 예약 필수.",
  amenitiesNote:
    "근처에 마트(콜스/울워스), 카페, 약국 다수. QVB·달링하버 도보 10분 내. 무료 Wi-Fi 및 피트니스 센터 이용 가능.",
  reservation: {
    // ▼ PII — 환경변수에서 주입 (소스에 하드코딩 금지)
    agodaBookingId: hotelPrivate.agodaBookingId,
    referenceNo: hotelPrivate.referenceNo,
    guestName: hotelPrivate.guestName,
    memberId: hotelPrivate.memberId,
    totalAmount: hotelPrivate.totalAmount,
    // ▲ PII 끝

    // 공개 가능 정보
    checkIn: "2026-06-27",
    checkOut: "2026-07-03",
    nights: 6,
    rooms: 1,
    adults: 4,
    children: 0,
    roomType: "2 베드룸 스위트",
    bedConfig: "1 King bed + 2 Twin beds",
    paymentMethod: "호텔 현장 결제 (Agoda 결제 아님)",
    amenities: ["무료 Wi-Fi", "피트니스 센터"],
    preferences: ["금연 객실", "고층", "트윈베드", "조용한 객실"],
    arrivalTimeRequest: "10:00 ~ 11:00 도착 예정",
    additionalRequest: "얼리 체크인 또는 호텔 짐 보관 요청",
    cancellationPolicy:
      "2026-06-26 전까지 무료 취소 가능. 체크인 1일 이내 취소 또는 노쇼 시 예약 요금의 17% 부과.",
  },
  taxiPhrases: [
    {
      label: "호텔로 갈 때",
      en: "Please take us to Meriton Suites Kent Street, 528 Kent Street, Sydney CBD.",
      ko: "메리톤 스위트 켄트 스트리트, 528 Kent Street, 시드니 CBD로 가주세요.",
    },
    {
      label: "공항으로 갈 때",
      en: "Please take us to Sydney International Airport, Terminal 1.",
      ko: "시드니 국제공항 1터미널로 가주세요.",
    },
    {
      label: "거리/소요시간 확인",
      en: "How long will it take to get there?",
      ko: "거기까지 얼마나 걸리나요?",
    },
  ],
};
