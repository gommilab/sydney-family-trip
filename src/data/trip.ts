export type Intensity = "낮음" | "낮음~중간" | "중간" | "높음";

export type DayPlan = {
  day: number;
  date?: string;
  weekday: string;
  title: string;
  /** 홈 상단 핵심 카드용 한 줄 요약 */
  shortSummary: string;
  /** 홈 상단 핵심 카드의 highlight 라인 (`/` 구분) */
  highlight: string;
  /** 카드 헤더 이미지 키 (PlaceholderImage 가 인식하는 키) */
  images: string[];
  /** 코스 흐름 (전체 일정 요약의 펼침 상세에서 → 화살표로 연결됨) */
  routeSummary: string[];
  /** 기존: 상세 페이지에서 사용 */
  areas: string[];
  intensity: Intensity;
  theme: string;
  summary: string;
  timeline: { time: string; activity: string }[];
  highlights: string[];
  /** 데이터로만 유지 (현재 UI 에서는 렌더링하지 않음) */
  tips: string[];
  /** 데이터로만 유지 (현재 UI 에서는 렌더링하지 않음) */
  alternatives: string[];
};

export const tripInfo = {
  name: "우리 가족 시드니 여행(2026년)",
  subtitle: "80대 부모님과 함께하는 7일 일정",
  startDate:
    "출국 2026-06-26 (금) 19:10 인천 출발 → 06-27 (토) 06:20 시드니 도착 / 귀국 2026-07-03 (금) 07:55 시드니 출발 → 17:35 인천 도착",
  totalDays: 7,
  hotel: {
    nameKo: "시드니 CBD 숙소",
    address: "528 Kent Street, Sydney CBD, Sydney, Australia, 2000",
    addressEn: "528 Kent Street, Sydney NSW 2000, Australia",
  },
};

export const tripDays: DayPlan[] = [
  {
    day: 1,
    date: "6/27",
    weekday: "토요일",
    title: "시드니 도착 & 동부해안 감성 투어",
    shortSummary:
      "06:20 시드니 도착 후 공항 픽업 투어로 동부해안을 가볍게 둘러보는 적응 일정",
    highlight:
      "06:20 시드니 도착 / 공항 픽업 투어 / 본다이 비치 / 시드니대학교 / 호텔 휴식",
    images: ["bondi-beach", "east-coast", "sydney-uni"],
    routeSummary: [
      "06:20 시드니 공항 도착",
      "공항 픽업 투어 (3시간)",
      "본다이 비치",
      "동부해안",
      "시드니대학교",
      "호텔 도착",
      "마트 장보기",
      "저녁 휴식",
    ],
    areas: ["시드니 공항", "본다이 비치", "동부해안", "시드니대학교"],
    intensity: "낮음",
    theme: "도착일 / 적응일",
    summary:
      "인천 6/26 19:10 출발 → 시드니 6/27 06:20 새벽 도착. 새벽 도착이라 공항 픽업 투어로 자연스럽게 일정을 시작하고, 호텔 정식 체크인 시각(보통 14:00)까지는 짐 보관 + 가벼운 동선으로 회복에 집중.",
    timeline: [
      { time: "06:20", activity: "시드니 공항 도착" },
      { time: "06:30 ~ 07:30", activity: "입국 심사 / 수하물 수령" },
      {
        time: "07:30 ~ 10:30",
        activity:
          "공항 픽업 투어 (3시간) — 본다이 비치 → 시드니 동부해안 → 시드니대학교",
      },
      { time: "11:00 전후", activity: "호텔 도착 → 짐 보관 (얼리 체크인 요청)" },
      { time: "11:00 ~ 14:00", activity: "호텔 인근 카페·점심 / 가벼운 산책" },
      { time: "14:00 이후", activity: "정식 체크인 후 객실 휴식" },
      { time: "오후 늦게", activity: "인근 마트(Coles/Woolworths) 장보기" },
      { time: "저녁", activity: "호텔 휴식 및 컨디션 회복" },
    ],
    highlights: [
      "새벽 도착이지만 픽업 투어가 바로 이어지므로 비행 중 충분한 수면 확보가 핵심",
      "호텔 정식 체크인(14:00) 전까지는 짐 보관 + 가벼운 일정으로 운영",
      "본다이 비치를 첫날 방문하므로 이후 일정에서 중복 방문은 줄임",
    ],
    tips: [
      "비행 중 가능한 한 수면 확보 (06:20 도착 후 바로 일정 시작)",
      "오래 걷지 않기 (특히 부모님)",
      "호텔 짐 보관 / 얼리 체크인 가능 여부 사전 확인",
      "호텔 체크인 후 저녁 외출은 최소화",
      "물, 간단한 간식, 선크림 준비",
    ],
    alternatives: [
      "비행 피로가 크면 픽업 투어 코스를 축소(본다이 위주)로 요청",
      "호텔 체크인이 지연되면 인근 카페에서 길게 휴식",
      "마트 장보기 생략하고 호텔 휴식 후 호텔 근처 식당에서 저녁",
    ],
  },
  {
    day: 2,
    date: "6/28",
    weekday: "일요일",
    title: "시드니 도심 감성 데이",
    shortSummary:
      "오페라하우스와 더 록스, QVB, 달링하버를 여유롭게 즐기는 도심 일정",
    highlight: "서큘러키 / 오페라하우스 / 더 록스 / QVB / 달링하버 야경",
    images: ["opera-house", "qvb", "darling-harbour"],
    routeSummary: [
      "서큘러키",
      "오페라하우스 주변 산책",
      "카페 브런치",
      "더 록스",
      "QVB",
      "달링하버 야경",
      "저녁식사",
    ],
    areas: ["서큘러키", "오페라하우스", "더 록스", "QVB", "달링하버"],
    intensity: "낮음~중간",
    theme: "자유일정 / 도심 감성 / 야경",
    summary:
      "이동을 최소화하고 카페 휴식을 충분히 넣는 도심 산책일. 오페라하우스는 외부 감상, QVB는 건축과 휴식, 달링하버는 야경 중심으로.",
    timeline: [
      { time: "오전", activity: "서큘러키 주변 산책" },
      { time: "오전", activity: "오페라하우스 외부 감상 및 사진 촬영" },
      { time: "오전 후반", activity: "카페 브런치" },
      { time: "낮", activity: "더 록스 거리 산책" },
      { time: "오후", activity: "QVB 방문, 쇼핑 및 카페 휴식" },
      { time: "저녁", activity: "달링하버 야경 감상" },
      { time: "저녁", activity: "달링하버 또는 CBD 인근 저녁식사" },
    ],
    highlights: [
      "추천 동선: 호텔 → 서큘러키 → 오페라하우스 → 더 록스 → QVB → 달링하버 → 호텔",
      "페리 관광은 목요일 고래 크루즈와 중복될 수 있어 제외",
      "시드니 도심 감성을 여유롭게 즐기는 날",
    ],
    tips: [
      "오페라하우스 내부 투어보다는 외부 감상 중심",
      "QVB에서는 쇼핑보다 건축 감상과 휴식 중심",
      "야경 후 너무 늦지 않게 호텔 복귀",
    ],
    alternatives: [
      "컨디션 안 좋으면 서큘러키와 QVB만 보고 달링하버 야경은 생략",
      "더위/체력 문제 시 더 록스 산책 축소, QVB 카페 휴식 길게 잡기",
    ],
  },
  {
    day: 3,
    date: "6/29",
    weekday: "월요일",
    title: "블루마운틴 투어 참여",
    shortSummary:
      "Scenic World와 세자매봉, 페더데일을 포함한 대표 자연 투어",
    highlight: "Scenic World / Echo Point / 세자매봉 / 페더데일",
    images: ["scenic-world", "three-sisters", "featherdale"],
    routeSummary: [
      "블루마운틴 출발",
      "페더데일",
      "Scenic World",
      "Echo Point",
      "세자매봉",
      "시드니 귀환",
    ],
    areas: ["블루마운틴", "Scenic World", "Echo Point", "세자매봉", "페더데일"],
    intensity: "높음",
    theme: "핵심 자연 일정 / 산악 절경",
    summary:
      "이번 여행의 대표 자연 일정. Scenic World 케이블카·급경사 열차·숲길 산책과 세자매봉 절경을 경험하는 체력 소모가 큰 날.",
    timeline: [
      { time: "오전", activity: "블루마운틴 투어 출발" },
      {
        time: "오전~낮",
        activity: "페더데일 야생동물공원 또는 투어 포함 코스 방문",
      },
      { time: "낮~오후", activity: "블루마운틴 주요 전망대 방문" },
      { time: "오후", activity: "Scenic World 체험" },
      {
        time: "주요 체험",
        activity: "Skyway, Railway, Cableway, Walkway",
      },
      { time: "오후 늦게", activity: "Echo Point 및 세자매봉 감상" },
      { time: "저녁", activity: "시드니 귀환 후 휴식" },
    ],
    highlights: [
      "Scenic World 이용을 고려해 혼잡도가 낮은 월요일에 배치",
      "산악 전망, 케이블카, 급경사 열차, 숲길 산책을 한 번에 경험",
      "이번 여행에서 체력 소모가 가장 큰 일정",
    ],
    tips: [
      "편한 신발 필수 착용",
      "부모님은 대기시간과 계단 구간 주의",
      "저녁 귀환 후 추가 일정 금지",
      "다음날 울릉공 투어가 있으므로 조기 휴식",
    ],
    alternatives: [
      "부모님 체력 저하 시 Walkway·계단 구간 생략, 전망대 위주로 단축",
      "날씨 불량(안개 짙음) 시 Scenic World 실내 위주, 외부 전망대 축소",
    ],
  },
  {
    day: 4,
    date: "6/30",
    weekday: "화요일",
    title: "울릉공 · 키아마 · 제링공 투어 참여",
    shortSummary:
      "남부 해안의 절경과 Sea Cliff Bridge, 키아마 블로우홀을 즐기는 해안 투어",
    highlight: "Sea Cliff Bridge / 울릉공 / 키아마 / 제링공",
    images: ["sea-cliff-bridge", "kiama", "gerringong"],
    routeSummary: [
      "시드니 출발",
      "로열 국립공원",
      "Sea Cliff Bridge",
      "울릉공",
      "키아마 블로우홀",
      "제링공",
      "시드니 귀환",
    ],
    areas: [
      "로열 국립공원",
      "Sea Cliff Bridge",
      "울릉공",
      "키아마",
      "제링공",
    ],
    intensity: "중간",
    theme: "남부 해안 드라이브 / 한국인 가이드 투어",
    summary:
      "블루마운틴과는 다른 바다·절벽·초원 풍경. 차량 이동 중심이라 체력 부담은 적지만 승하차가 잦은 드라이브 일정.",
    timeline: [
      { time: "오전", activity: "시드니 출발" },
      { time: "오전", activity: "로열 국립공원 또는 남부 해안 드라이브" },
      { time: "낮", activity: "Sea Cliff Bridge 및 해안 절경 감상" },
      { time: "낮~오후", activity: "울릉공 방문" },
      { time: "오후", activity: "키아마 블로우홀 관람" },
      { time: "오후", activity: "제링공 해안 및 초원 풍경 감상" },
      { time: "저녁", activity: "시드니 귀환 후 휴식" },
    ],
    highlights: [
      "블루마운틴과 다른 바다·절벽·초원 풍경",
      "한국인 가이드 설명으로 호주 생활과 문화 이해",
      "차량 이동 중심이라 체력 부담이 상대적으로 낮음",
    ],
    tips: [
      "차량 진행 방향 기준 오른쪽 창가 좌석 선호",
      "해안 바람이 강할 수 있으므로 바람막이 준비",
      "승하차 반복이 있으므로 짐은 가볍게",
      "귀환 후 저녁 일정 최소화",
    ],
    alternatives: [
      "부모님 컨디션에 따라 키아마 블로우홀까지만 보고 제링공 생략",
      "비/강풍 시 Sea Cliff Bridge 도보 산책 생략, 차량 통과만",
    ],
  },
  {
    day: 5,
    date: "7/1",
    weekday: "수요일",
    title: "SEA LIFE + 쇼핑 + 회복형 자유일정",
    shortSummary:
      "아쿠아리움과 쇼핑, 카페, 호텔 휴식을 중심으로 한 회복 일정",
    highlight: "SEA LIFE / QVB / Westfield / LEGO Store / 호텔 휴식",
    images: ["sea-life", "westfield", "lego-store"],
    routeSummary: [
      "늦은 브런치",
      "SEA LIFE",
      "카페 휴식",
      "쇼핑",
      "호텔 휴식",
      "가벼운 저녁 외출",
    ],
    areas: [
      "SEA LIFE",
      "QVB",
      "Westfield Sydney",
      "LEGO Store",
      "카페",
      "호텔",
    ],
    intensity: "낮음",
    theme: "회복 / 쇼핑 / 실내 일정 / 가족 취향 반영",
    summary:
      "블루마운틴과 울릉공 투어 이후 반드시 필요한 완충일. 실내 일정 중심이라 날씨가 좋지 않아도 운영 가능.",
    timeline: [
      { time: "오전", activity: "늦은 기상 및 여유로운 브런치" },
      { time: "오전~낮", activity: "SEA LIFE Sydney Aquarium 방문" },
      { time: "낮", activity: "카페 휴식" },
      { time: "오후", activity: "쇼핑 선택 일정" },
      {
        time: "쇼핑 후보",
        activity: "QVB, Westfield Sydney, LEGO Store, 피규어/굿즈 매장",
      },
      { time: "오후 늦게", activity: "호텔 휴식" },
      { time: "저녁", activity: "가벼운 외출 또는 간단한 저녁식사" },
    ],
    highlights: [
      "A안: 부모님 컨디션 양호 → SEA LIFE + 카페 + 쇼핑",
      "B안: 피로 누적 → 브런치 + 호텔 휴식 + 저녁 외출",
      "C안: 아들 취향 반영 → LEGO, Hot Toys, 피규어/굿즈 매장 중심 쇼핑",
    ],
    tips: [
      "오전 일정을 너무 일찍 시작하지 않기",
      "쇼핑 동선은 너무 넓히지 않기",
      "가족 컨디션에 따라 A/B/C안 선택",
      "목요일 고래 투어를 위해 저녁은 가볍게 마무리",
    ],
    alternatives: [
      "SEA LIFE 생략 후 호텔 휴식 + 저녁만 외출 (B안 풀버전)",
      "쇼핑은 QVB 한 곳만, 나머지는 호텔 도보권 카페로 압축",
    ],
  },
  {
    day: 6,
    date: "7/2",
    weekday: "목요일",
    title: "시드니 고래 관찰 크루즈",
    shortSummary:
      "시드니 하버에서 출발해 외해에서 고래를 관찰하는 특별 체험 일정",
    highlight: "고래 관찰 크루즈 / 시드니 하버 / 외해 / 오후 휴식",
    images: ["whale-cruise", "sydney-harbour", "ocean"],
    routeSummary: [
      "호텔 출발",
      "크루즈 탑승",
      "시드니 하버 출항",
      "외해 이동",
      "고래 관찰",
      "점심 또는 카페",
      "호텔 휴식 / 쇼핑",
    ],
    areas: ["시드니 하버", "외해"],
    intensity: "중간",
    theme: "특별 체험 / 바다 / 고래 관찰",
    summary:
      "이번 여행의 마지막 특별 체험. 시드니 하버와 외해에서 혹등고래를 만나는 날. 짐 정리 시간 확보가 중요한 마지막 밤.",
    timeline: [
      { time: "오전", activity: "호텔에서 여유롭게 출발" },
      { time: "오전~낮", activity: "고래 관찰 크루즈 탑승" },
      {
        time: "주요 체험",
        activity: "시드니 하버 출항 → 외해 이동 → 혹등고래 관찰",
      },
      { time: "낮~오후", activity: "크루즈 종료 후 점심 또는 카페 휴식" },
      { time: "오후", activity: "호텔 휴식 또는 가벼운 쇼핑" },
      { time: "저녁", activity: "마지막 저녁식사 및 간단한 산책" },
    ],
    highlights: [
      "별도 페리 관광을 생략했기 때문에 이날 하버·바다 풍경을 충분히 즐김",
      "쌍동선, 넓은 데크, 실내 라운지가 있는 상품 추천",
      "부모님 체력 회복 후 배치한 특별 체험 일정",
    ],
    tips: [
      "정오 전후 출발 상품 추천",
      "멀미약 사전 준비",
      "바람막이, 모자, 목도리 준비",
      "크루즈 후 무리한 일정 금지",
      "마지막 밤이므로 짐 정리 완료 + 다음날 04:30 새벽 체크아웃 대비 22시 이전 취침",
      "다음날(Day 7) 새벽 공항 이동용 택시 사전 예약 필수",
    ],
    alternatives: [
      "파도/날씨 불량 시 크루즈 취소 가능성 → 달링하버 산책 + 실내 일정 대체",
      "크루즈 후 곧장 호텔 복귀, 저녁은 호텔 근처에서 간단히",
    ],
  },
  {
    day: 7,
    date: "7/3",
    weekday: "금요일",
    title: "시드니 공항 이동 & 인천 귀국",
    shortSummary:
      "새벽 체크아웃 후 공항으로 이동해 07:55 시드니 출발 → 17:35 인천 도착하는 귀국 일정",
    highlight:
      "04:30 새벽 체크아웃 / 05:00 공항 도착 / 07:55 시드니 출발 / 17:35 인천 도착",
    images: ["airport", "plane", "suitcase"],
    routeSummary: [
      "04:30 호텔 체크아웃",
      "공항 이동 (택시)",
      "05:15 공항 도착",
      "출국 수속",
      "07:55 시드니 출발",
      "17:35 인천 도착",
    ],
    areas: ["시드니 공항"],
    intensity: "낮음",
    theme: "귀국일 / 새벽 출발",
    summary:
      "07:55 시드니 출발 → 17:35 인천 도착. 새벽 비행편이라 04:30 새벽 체크아웃이 필수. Day 6(7/2) 밤에 짐 정리를 완료하고 22시 이전 취침으로 컨디션 관리.",
    timeline: [
      { time: "04:00", activity: "기상 / 마지막 짐 점검" },
      { time: "04:30", activity: "호텔 체크아웃 (새벽 체크아웃 절차 사전 확인)" },
      {
        time: "04:45",
        activity: "택시(사전 예약 추천) 또는 픽업 차량으로 공항 이동",
      },
      {
        time: "05:00 ~ 05:15",
        activity: "시드니 국제공항 도착 (출발 약 2시간 30분 전)",
      },
      {
        time: "05:15 ~ 07:00",
        activity: "체크인 / 짐 부치기 / 출국 수속 / 보안검색",
      },
      { time: "07:55", activity: "시드니 출발 (인천행)" },
      { time: "17:35", activity: "인천국제공항 도착" },
    ],
    highlights: [
      "07:55 새벽 비행편이므로 04:30 새벽 체크아웃이 필수",
      "Day 6(7/2) 밤에 짐 정리 완료 + 22시 이전 취침으로 컨디션 관리",
      "새벽 시간대 택시는 사전 예약 강력 권장 (Uber 또는 호텔 컨시어지)",
      "호텔에 새벽 체크아웃 절차(24시간 프런트 / 키 드롭) 사전 확인",
    ],
    tips: [
      "전날(Day 6) 밤은 무리한 외출 없이 일찍 취침",
      "택시 사전 예약 — 새벽 시간 콜택시 부족 가능",
      "여권·항공권·TRS 환급용 영수증은 별도 가방에 분리",
      "부모님 휠체어 / 우선 탑승 서비스 사전 요청 가능 (항공사 문의)",
      "체크아웃 전 객실 분실물·금고 점검",
      "면세품/액체류 휴대 규정 재확인",
    ],
    alternatives: [
      "새벽 체크아웃이 어려우면 Day 6 밤에 공항 인근 호텔로 1박 이동 (옵션)",
      "택시 대신 사전 예약 픽업 밴 이용 — 짐·4인 가족 여유 확보",
    ],
  },
];
