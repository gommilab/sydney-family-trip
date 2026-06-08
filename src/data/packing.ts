/**
 * 카테고리별 준비물 목록.
 * 화면 UI 에는 노출하지 않지만, AI 도우미 (AI 질문하기)가
 * "내일 준비물 알려줘" 같은 질문에 답하기 위해 참고합니다.
 */

export type PackingCategory = {
  id: string;
  title: string;
  /** 어떤 Day 에 해당하는지 (없으면 공통) */
  forDays?: number[];
  items: string[];
};

export const packingByCategory: PackingCategory[] = [
  {
    id: "common",
    title: "공통 (전 일정)",
    items: [
      "여권",
      "항공권",
      "호텔 바우처",
      "여행자보험",
      "카드",
      "현금 소액",
      "보조배터리",
      "충전기",
      "선크림",
      "선글라스",
      "물병",
    ],
  },
  {
    id: "parents",
    title: "부모님 (매일)",
    items: [
      "상비약",
      "멀미약",
      "얇은 겉옷",
      "편한 신발",
      "무릎/허리 보호용품",
      "간식",
      "물",
    ],
  },
  {
    id: "bluemountain",
    title: "블루마운틴 (Day 3)",
    forDays: [3],
    items: ["바람막이", "편한 운동화", "따뜻한 옷", "물", "간식"],
  },
  {
    id: "coast",
    title: "울릉공 / 해안 투어 (Day 4)",
    forDays: [4],
    items: ["바람막이", "선글라스", "모자", "가벼운 가방"],
  },
  {
    id: "whale",
    title: "고래 크루즈 (Day 6)",
    forDays: [6],
    items: ["멀미약", "따뜻한 외투", "목도리", "모자", "카메라", "물"],
  },
  {
    id: "returning",
    title: "귀국 전 점검 (Day 6~7)",
    forDays: [6, 7],
    items: [
      "여권 확인",
      "항공 시간 확인",
      "숙소 체크아웃 시간 확인",
      "공항 이동수단 확인",
      "짐 정리",
      "액체류/면세품 확인",
    ],
  },
];
