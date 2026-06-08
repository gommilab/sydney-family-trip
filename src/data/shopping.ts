/**
 * 시드니 가족여행 쇼핑 가이드.
 * - 기타정보 페이지에 노출되고, AI 도우미(AI 질문하기) 컨텍스트로도 사용된다.
 * - 가격/재고는 시점에 따라 다르므로 표기하지 않는다.
 */

export type ShoppingCategory =
  | "아이/가족 취향"
  | "호주 특산 식품"
  | "뷰티/스킨케어"
  | "건강식품"
  | "의류/기념품";

export type ShoppingItem = {
  name: string;
  icon: string;
  category: ShoppingCategory;
  /** 어디서 살 수 있는지 (장소 이름 또는 매장 유형) */
  where: string[];
  /** 구매 팁/주의사항 */
  note?: string;
};

export const shoppingItems: ShoppingItem[] = [
  // 아이/가족 취향
  {
    name: "LEGO",
    icon: "🧱",
    category: "아이/가족 취향",
    where: [
      "LEGO Certified Store (Pitt Street Mall, Westfield Sydney)",
      "Myer / David Jones 장난감 코너",
    ],
    note: "호주 한정 세트 또는 시드니 오페라하우스 미니 세트 확인. 부피 큰 세트는 항공 수하물 부피·무게 사전 확인.",
  },
  {
    name: "Hot Toys / 피규어 · 굿즈",
    icon: "🦸",
    category: "아이/가족 취향",
    where: [
      "Kinokuniya Sydney (The Galeries, 500 George St)",
      "Zing Pop Culture (Westfield Sydney 등)",
      "Galaxy World (CBD)",
    ],
    note: "한정판은 도착 직후 매장 재고 전화로 확인 추천. 박스 운반용 완충재 챙기면 좋음.",
  },
  {
    name: "건담 / 애니메이션 굿즈",
    icon: "🤖",
    category: "아이/가족 취향",
    where: ["Kinokuniya Sydney", "Zing Pop Culture", "Madman Anime Shop"],
    note: "Kinokuniya 가 한국·일본 작품 라인업이 가장 다양.",
  },

  // 호주 특산 식품
  {
    name: "Tim Tam (호주 국민 초콜릿 비스킷)",
    icon: "🍫",
    category: "호주 특산 식품",
    where: ["Coles", "Woolworths", "시드니 공항 면세점"],
    note: "마트 가격이 면세점보다 저렴. 한국에 없는 한정 맛(Salted Caramel, Dark 등) 위주로 구매.",
  },
  {
    name: "마누카 꿀 (Manuka Honey)",
    icon: "🍯",
    category: "호주 특산 식품",
    where: ["Chemist Warehouse", "Coles/Woolworths", "면세점"],
    note: "UMF/MGO 등급 표기 확인 (UMF 10+ 이상). 부모님 선물용으로 인기.",
  },
  {
    name: "Vegemite",
    icon: "🥖",
    category: "호주 특산 식품",
    where: ["Coles", "Woolworths"],
    note: "호불호 강함. 소포장으로 체험용만 구매 추천.",
  },
  {
    name: "호주 와인 (Penfolds, Jacob's Creek 등)",
    icon: "🍷",
    category: "호주 특산 식품",
    where: ["BWS", "Dan Murphy's", "면세점"],
    note: "한국 반입은 1인당 1L 1병까지 면세. 초과 시 세금 부과.",
  },

  // 뷰티
  {
    name: "Aesop (호주 발) 스킨케어",
    icon: "🧴",
    category: "뷰티/스킨케어",
    where: [
      "Aesop Sydney (QVB, Strand Arcade 등 다수)",
      "David Jones 백화점",
    ],
    note: "호주가 본사라 한국보다 가격 합리적. 핸드워시·핸드밤이 인기.",
  },
  {
    name: "Jurlique (호주 천연 화장품)",
    icon: "🌿",
    category: "뷰티/스킨케어",
    where: ["David Jones", "Myer", "면세점"],
    note: "장미 미스트, 핸드크림이 대표 상품.",
  },

  // 건강식품
  {
    name: "Blackmores 비타민/건강식품",
    icon: "💊",
    category: "건강식품",
    where: ["Chemist Warehouse (강추, 가격 최저)", "Priceline Pharmacy"],
    note: "부모님 종합비타민·관절 영양제 인기. Chemist Warehouse 가 보통 30~50% 저렴.",
  },
  {
    name: "Swisse 비타민/콜라겐",
    icon: "💊",
    category: "건강식품",
    where: ["Chemist Warehouse", "Priceline", "면세점"],
    note: "콜라겐 음료/태블릿, 종합비타민이 인기.",
  },

  // 의류/기념품
  {
    name: "UGG 부츠 (호주 정통 브랜드)",
    icon: "👢",
    category: "의류/기념품",
    where: [
      "UGG Australia 매장",
      "David Jones",
      "Myer",
      "Paddington Markets (수공예 부티크)",
    ],
    note: "한국에 잘 알려진 UGG (미국 브랜드) 와 호주 현지 UGG 는 다름. 호주산 정품 라벨 확인.",
  },
  {
    name: "코알라/캥거루 인형·굿즈",
    icon: "🐨",
    category: "의류/기념품",
    where: ["The Rocks Markets (주말)", "공항 면세점", "기념품점"],
    note: "마켓이 가격·디자인 둘 다 합리적. 부모님 선물용 작은 사이즈 추천.",
  },
  {
    name: "R.M.Williams 부츠/가죽 제품",
    icon: "🥾",
    category: "의류/기념품",
    where: ["R.M.Williams 매장 (QVB 등)", "David Jones"],
    note: "호주 정통 가죽 부츠. 가격대 높지만 평생 사용 가능한 품질.",
  },
];

export type ShoppingPlace = {
  name: string;
  type: "쇼핑몰" | "백화점" | "전문매장" | "약국체인" | "마트" | "마켓";
  area: string;
  note?: string;
};

export const shoppingPlaces: ShoppingPlace[] = [
  {
    name: "QVB (Queen Victoria Building)",
    type: "쇼핑몰",
    area: "CBD · 호텔 도보 5분",
    note: "빅토리아 양식 건축 감상도 함께. 카페 휴식 좋아 부모님 동행 추천.",
  },
  {
    name: "Westfield Sydney",
    type: "쇼핑몰",
    area: "Pitt Street Mall · 호텔 도보 10분",
    note: "대형 쇼핑몰. LEGO Store, 푸드코트, 명품·캐주얼 한 번에 해결.",
  },
  {
    name: "The Strand Arcade",
    type: "쇼핑몰",
    area: "Pitt Street Mall · CBD",
    note: "1892년 빅토리아풍 아케이드. 호주 디자이너 브랜드/카페 위주.",
  },
  {
    name: "David Jones",
    type: "백화점",
    area: "Elizabeth Street · CBD",
    note: "호주 대표 백화점. UGG, Aesop, Jurlique 한곳에서 비교 구매 가능.",
  },
  {
    name: "Myer",
    type: "백화점",
    area: "Pitt Street Mall · CBD",
    note: "David Jones 와 함께 호주 양대 백화점. 세일 시즌에 강점.",
  },
  {
    name: "Kinokuniya Sydney",
    type: "전문매장",
    area: "The Galeries (500 George St) · QVB 맞은편",
    note: "남반구 최대 일본 서점. 피규어·문구·애니 굿즈 코너 풍부.",
  },
  {
    name: "Chemist Warehouse",
    type: "약국체인",
    area: "시내 다수 지점 (George St 등)",
    note: "Blackmores·Swisse·마누카 꿀 등 가격이 가장 저렴. 영수증/세금환급 확인.",
  },
  {
    name: "Coles / Woolworths",
    type: "마트",
    area: "CBD 곳곳 + 호텔 인근",
    note: "Tim Tam, Vegemite, 와인 등 호주 식품의 가장 합리적인 가격대.",
  },
  {
    name: "The Rocks Markets",
    type: "마켓",
    area: "The Rocks · 주말(토·일) 운영",
    note: "수공예 기념품, 호주산 가죽·양털 제품, 푸드. 날씨 좋은 주말 일정에 추천.",
  },
  {
    name: "Paddington Markets",
    type: "마켓",
    area: "Paddington · 토요일 운영",
    note: "호주 신진 디자이너 의류·소품. 한적해서 부모님 동행도 부담 적음.",
  },
];

export const shoppingTips: string[] = [
  "GST 환급(TRS): 출국 60일 이내 한 상점에서 AUD 300 이상 구매 시 공항에서 10% 환급 가능. 영수증·여권·실물 챙기기.",
  "면세점 vs 시내: Tim Tam·와인은 시내 마트, 비타민은 Chemist Warehouse, 명품·향수는 면세점이 보통 유리.",
  "부피·무게 주의: LEGO 대형 세트, Hot Toys 박스는 항공 수하물 규정 사전 확인.",
  "현금보다 카드: 호주는 카드 결제가 보편적. 환전 부담 없이 카드 위주로 결제.",
  "쇼핑 위주 일정은 Day 5(회복형 자유일정) 에 배치하면 가족 컨디션 부담이 적다.",
];
