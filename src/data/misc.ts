export type MiscShortcut = {
  id: string;
  title: string;
  description: string;
  to: string;
  icon: string;
};

/** 기타정보 페이지에서 보여줄 바로가기들 */
export const miscShortcuts: MiscShortcut[] = [
  {
    id: "emergency",
    title: "긴급 정보",
    description: "비상 연락처, 영어 문장, 응급 신고 (000)",
    to: "/emergency",
    icon: "🆘",
  },
];

/** 일정 운영 팁 (전체 일정에 공통적으로 적용) */
export const operationTips: { title: string; body: string }[] = [
  {
    title: "오전은 천천히 시작",
    body: "장거리 비행 직후라 오전 일정은 늦게 시작해도 괜찮습니다. 무리한 일정보다는 컨디션 회복이 우선.",
  },
  {
    title: "투어 중에는 가벼운 짐만",
    body: "승하차가 잦은 투어(Day 3, 4)는 큰 가방 대신 가벼운 백팩 하나. 물·간식·바람막이 위주.",
  },
  {
    title: "고래 크루즈 후는 추가 일정 금지",
    body: "Day 6 크루즈가 끝난 저녁은 무리하지 말고 짐 정리 시간으로 활용하세요.",
  },
  {
    title: "환전 대신 카드 위주",
    body: "호주는 카드 결제가 보편적입니다. 현금은 택시 팁/비상용 정도만.",
  },
];

/** 자주 쓰는 영어 표현 (긴급 페이지와 별도, 일반 회화용) */
export const travelPhrases: { en: string; ko: string }[] = [
  {
    en: "Could you take a photo of us, please?",
    ko: "사진 한 장 찍어주실 수 있나요?",
  },
  {
    en: "Could we have a table for four, please?",
    ko: "4명 자리 부탁드립니다.",
  },
  { en: "Is this seat available?", ko: "이 자리에 앉아도 되나요?" },
  { en: "Could I have the bill, please?", ko: "계산서 부탁드립니다." },
  {
    en: "Where is the nearest restroom?",
    ko: "가장 가까운 화장실이 어디인가요?",
  },
];
