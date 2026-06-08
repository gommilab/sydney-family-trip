export type ReservationStatus =
  | "예약완료"
  | "예약진행"
  | "검토중"
  | "현장구매"
  | "미정";

/** 예약처(여행사·플랫폼) */
export type Vendor = "클룩" | "마이리얼트립" | "Agoda" | "현장";

export type Reservation = {
  id: string;
  name: string;
  /** 연관 Day (없으면 공통) */
  day?: number;
  status: ReservationStatus;
  /** 예약처 (어디서 예약했는지) */
  vendor?: Vendor;
  /** 한 줄 메모 (가격, 시간, 픽업장소 등) */
  note?: string;
  /** 상품 상세 페이지 URL (Klook/마이리얼트립 등) */
  url?: string;
};

export const reservations: Reservation[] = [
  {
    id: "hotel",
    name: "메리톤 스위트 켄트 스트리트 (6박 7일)",
    status: "예약완료",
    vendor: "Agoda",
    note: "2 베드룸 스위트 · 6/27 체크인 ~ 7/3 체크아웃 · 호텔 현장 결제",
  },
  {
    id: "airport-pickup",
    name: "공항 픽업 · 동부해안 · 본다이비치 · 시드니대학교 투어",
    day: 1,
    status: "예약완료",
    vendor: "마이리얼트립",
    note: "공항 도착 후 3시간 픽업 투어 · 본다이/동부해안/시드니대학교",
  },
  {
    id: "blue-mountains",
    name: "블루마운틴·시닉월드·페더데일 한국인 가이드 투어",
    day: 3,
    status: "예약완료",
    vendor: "클룩",
    note: "Klook #167648 · 한국인 가이드 · 시닉월드 포함 옵션 (Cableway·Railway·Skyway·Walkway) · 페더데일 야생동물공원",
    url: "https://www.klook.com/ko/activity/167648-featherdale-scenic-world-blue-mountains-tour-with-korean-guide/",
  },
  {
    id: "wollongong",
    name: "시드니 울릉공 · 키아마 · 제링공 한국인 가이드 투어",
    day: 4,
    status: "예약완료",
    vendor: "클룩",
    note: "한국인 가이드 · Sea Cliff Bridge / 키아마 블로우홀 포함",
  },
  {
    id: "whale-cruise",
    name: "시드니 고래 관찰 크루즈 by Captain Cook",
    day: 6,
    status: "예약완료",
    vendor: "클룩",
    note: "Captain Cook Cruises · 시드니 하버 출항 · 멀미약·바람막이·따뜻한 외투 준비",
  },
  {
    id: "sea-life",
    name: "SEA LIFE Sydney Aquarium",
    day: 5,
    status: "현장구매",
    vendor: "현장",
    note: "당일 컨디션 확인 후 현장 구매 · 컴비 티켓 검토 가능",
  },
];

export const statusStyle: Record<
  ReservationStatus,
  { label: string; badge: string }
> = {
  예약완료: {
    label: "예약완료",
    badge: "bg-leaf-100 text-leaf-500 border-leaf-200",
  },
  예약진행: {
    label: "예약진행",
    badge: "bg-ocean-100 text-ocean-700 border-ocean-200",
  },
  검토중: {
    label: "검토중",
    badge: "bg-sand-100 text-sand-500 border-sand-200",
  },
  현장구매: {
    label: "현장구매",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
  },
  미정: {
    label: "미정",
    badge: "bg-warn-100 text-warn-500 border-warn-200",
  },
};

export const vendorStyle: Record<
  Vendor,
  { label: string; icon: string; badge: string }
> = {
  클룩: {
    label: "클룩",
    icon: "🟠",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  마이리얼트립: {
    label: "마이리얼트립",
    icon: "🟣",
    badge: "bg-pink-50 text-pink-700 border-pink-200",
  },
  Agoda: {
    label: "Agoda",
    icon: "🔴",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  현장: {
    label: "현장 구매",
    icon: "🏪",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
  },
};
