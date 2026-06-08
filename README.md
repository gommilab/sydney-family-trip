# 우리 가족 시드니 여행 (Sydney Family Trip Planner)

80대 부모님과 함께하는 4인 가족 시드니 7일 여행을 위한 **모바일 우선 가이드 웹앱**.
홈 화면에서 **AI 여행 도우미**에게 자연어로 일정/준비물/대안을 물어볼 수 있고,
전체 일정은 Day 1~7 카드에서 펼쳐서 확인합니다.

## ✨ 주요 기능

- **AI 여행 도우미** — 일정 데이터·예약현황·호텔·준비물·가족 의사결정 규칙을 컨텍스트로
  OpenAI(`gpt-4o-mini` 기본)에 질의해서 한국어 답변을 받음
- **전체 일정 (Day 1~7)** — 카드 안의 "상세일정 펼치기"로 시간대별 일정/코스/팁/대안 확인
  (한 번에 하나만 펼침)
- **예약현황 / 호텔정보 / 기타정보** — 상단 3버튼 + 하단 탭에서 접근
- **긴급 정보** — 택시 기사용 영어 문장, 응급 연락처
- 모든 메모·체크·최근 AI 답변(최대 3개)은 `localStorage`에 자동 저장 (외부 서버 없음)

## 🧱 기술 스택

- Vite + React 18 + TypeScript + Tailwind CSS
- React Router (HashRouter — 정적 호스팅 환경에서 새로고침 안전)
- **AI 호출**: Vercel 서버리스 함수 (`api/travel-assistant.ts`)
  → OpenAI Chat Completions API
- Vite dev 모드에서는 `vite.config.ts`의 `devApiRoutes` 플러그인이 같은 핸들러를 실행

## 🚀 실행 방법

### 1) 의존성 설치

```bash
npm install
```

### 2) 환경변수 설정

```bash
cp .env.example .env.local
# .env.local 을 열어 값을 채워주세요.
```

#### 2-1) AI 질문하기 (서버측 비밀)
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
# OPENAI_MODEL=gpt-4o-mini   # 선택 (기본값)
```
API 키는 서버리스 함수 안에서만 사용됩니다 — 클라이언트 번들에 노출되지 않습니다.

#### 2-2) 호텔 예약 개인정보 (PII)

예약자명·회원ID·예약번호·금액은 **소스코드에 하드코딩되지 않습니다.**
모두 `.env.local` 의 `VITE_HOTEL_*` 환경변수로 주입됩니다:

```
VITE_HOTEL_GUEST_NAME=홍길동
VITE_HOTEL_MEMBER_ID=123456789
VITE_HOTEL_AGODA_BOOKING_ID=1234567890
VITE_HOTEL_REFERENCE_NO=1234567890
VITE_HOTEL_TOTAL_AMOUNT=AUD 0.00
```

- 값이 비어있어도 앱은 정상 동작 (해당 행이 UI/AI 응답에서 자동 숨김)
- `VITE_` 프리픽스가 붙은 값은 **클라이언트 번들에 인라인되어** 가족이 앱에서 볼 수 있게 됩니다. 이는 의도된 동작이며, git 에 커밋되지 않으면 공개 리포지토리 보안에 영향 없음.
- 운영 환경(Vercel) 에서는 대시보드의 **Environment Variables** 에 동일한 키를 등록.

> 🔐 `.env`, `.env.local`, `.env.*.local`, `*.local` 모두 `.gitignore` 에 등록되어 있어 커밋되지 않습니다.

> ⚠️ **이미 PII를 커밋한 경우**: git history 에는 이전 커밋이 남아있습니다. 공개 push 전에 `git filter-repo` 또는 BFG Repo-Cleaner 로 히스토리에서 제거하거나, 새 리포지토리로 다시 시작하세요. Agoda 예약 ID 자체는 변경 불가능합니다.

### 3) 개발 서버

```bash
npm run dev
# http://localhost:5173
```

Vite dev 서버가 `/api/travel-assistant` 도 함께 처리하므로
AI 도우미는 별도 백엔드 실행 없이 바로 동작합니다.

### 4) 프로덕션 빌드 / 미리보기

```bash
npm run build
npm run preview   # 빌드 결과 정적 미리보기 (AI 호출은 동작하지 않음)
```

> `npm run preview` 는 정적 결과만 서빙해서 `/api/*` 가 동작하지 않습니다.
> 실 API 테스트는 `npm run dev` 또는 Vercel 배포 환경에서 확인하세요.

## 🌐 배포 방법

이 앱은 **두 가지 배포처**에 모두 올릴 수 있습니다.

| 배포처 | URL 예 | AI 질문하기 | 설정 난이도 |
|---|---|---|---|
| **Vercel** (권장) | `sydney-family-trip-xxx.vercel.app` | ✅ 동작 | 쉬움 |
| **GitHub Pages** | `gommilab.github.io/sydney-family-trip/` | ❌ 동작 안 함 (정적 호스팅이라 `/api/*` 없음) | 쉬움 (Actions 자동 배포) |

> AI 기능이 꼭 필요하면 Vercel 을, 무료 정적 호스팅만으로 충분하면 GitHub Pages 를 쓰세요. 둘 다 동시에 띄워두는 것도 가능합니다.

### A) Vercel 배포

1. 이 폴더를 GitHub 의 본인 계정(`gommilab`)으로 push
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/gommilab/sydney-family-trip.git
   git push -u origin main
   ```
2. <https://vercel.com> → "New Project" → 저장소 선택
3. Framework: **Vite** 자동 감지 → 기본 설정 그대로
4. **Settings → Environment Variables** 에 등록:
   - `OPENAI_API_KEY` = `sk-...` (필수, 서버 시크릿)
   - (선택) `OPENAI_MODEL` = `gpt-4o-mini`
   - (선택, 호텔 PII) `VITE_HOTEL_GUEST_NAME`, `VITE_HOTEL_MEMBER_ID`,
     `VITE_HOTEL_AGODA_BOOKING_ID`, `VITE_HOTEL_REFERENCE_NO`,
     `VITE_HOTEL_TOTAL_AMOUNT`
5. Deploy → 생성된 URL 을 가족에게 공유

Vercel 은 `api/travel-assistant.ts` 를 **자동으로 서버리스 함수**로 인식해서
배포 URL의 `/api/travel-assistant` 엔드포인트로 노출합니다.

### B) GitHub Pages 배포 (`gommilab.github.io/sydney-family-trip/`)

이 저장소는 `.github/workflows/deploy.yml` 워크플로우를 통해
main 브랜치에 push 할 때마다 자동으로 GitHub Pages 에 배포되도록 구성되어 있습니다.

**최초 1회 설정 단계:**

1. GitHub 에서 빈 저장소 `sydney-family-trip` 을 `gommilab` 계정으로 생성
   (https://github.com/new — 절대로 README/license 같은 초기 파일 자동 생성 금지)

2. 로컬에서 첫 push:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/gommilab/sydney-family-trip.git
   git push -u origin main
   ```

3. GitHub 저장소 → **Settings → Pages**:
   - **Source** 를 `GitHub Actions` 로 변경 (Deploy from a branch ❌, GitHub Actions ✅)
   - 저장하면 자동으로 워크플로우가 실행됨

4. (선택) GitHub 저장소 → **Settings → Secrets and variables → Actions** → **New repository secret** 으로 호텔 PII 등록:
   - `VITE_HOTEL_GUEST_NAME`
   - `VITE_HOTEL_MEMBER_ID`
   - `VITE_HOTEL_AGODA_BOOKING_ID`
   - `VITE_HOTEL_REFERENCE_NO`
   - `VITE_HOTEL_TOTAL_AMOUNT`

   (등록하지 않으면 호텔 페이지의 예약자/예약번호/금액 행이 자동으로 숨겨집니다)

5. **Actions** 탭에서 "Deploy to GitHub Pages" 워크플로우가 완료되면
   `https://gommilab.github.io/sydney-family-trip/` 접속 가능

> 🔧 **base 경로 처리**: GitHub Pages 는 sub-path 에서 서빙되므로 워크플로우가
> `BASE=/sydney-family-trip/` 환경변수로 vite 빌드를 수행하고, [vite.config.ts](vite.config.ts) 가
> 이 값을 `base` 옵션에 반영합니다. HashRouter 를 사용하므로 라우팅은 별도 설정 불필요.

> ⚠️ **AI 질문하기 제한**: GitHub Pages 는 정적 호스팅이라 `api/travel-assistant.ts`
> 서버리스 함수가 동작하지 않습니다. AI 버튼을 누르면 "이 배포 환경에서는 동작하지 않습니다" 안내가 표시됩니다.

### C) Netlify / 그 외 호스팅

`api/` 폴더는 Vercel 컨벤션이므로, Netlify 를 쓰려면 다음과 같이 옮기세요.

```
netlify/functions/travel-assistant.ts   # 동일한 default export 사용
```

그리고 클라이언트의 호출 경로를 `/.netlify/functions/travel-assistant` 로 바꾸거나
`netlify.toml` 에 redirect 를 추가하면 됩니다.

## 📂 파일 구조

```
api/
  travel-assistant.ts          # 서버리스 함수 (OpenAI 호출)

src/
  App.tsx                       # 라우터 + 레이아웃
  main.tsx                      # 진입점

  components/
    AppHeader.tsx               # 상단 헤더
    BottomNav.tsx               # 하단 5개 탭
    HeaderSimple.tsx            # 홈 화면 제목
    InfoTopButtons.tsx          # 홈 상단 3버튼 (예약/호텔/기타)

    TravelAssistant.tsx         # AI 도우미 메인 카드 (입력/제출/히스토리)
    QuestionSuggestions.tsx     # 추천 질문 6개
    AssistantAnswerCard.tsx     # 답변 렌더링 (섹션/불릿 자동 처리)

    ScheduleSummaryList.tsx     # Day 1~7 리스트
    ScheduleDayCard.tsx         # Day 한 장 + 펼치기 버튼
    ExpandedScheduleDetail.tsx  # 펼침 상세 (timeline / 코스 / 포인트 / 팁 / 대안)

    DayCard.tsx                 # /itinerary 페이지용
    DayDetail.tsx               # /itinerary/:day 페이지용
    Timeline.tsx, Accordion.tsx, DayTabs.tsx
    EmergencyCard.tsx           # 긴급정보 페이지용
    PlaceholderImage.tsx        # 그라데이션 더미 이미지

  pages/
    HomePage.tsx
    ItineraryPage.tsx
    DayDetailPage.tsx
    ReservationsPage.tsx
    HotelPage.tsx
    MiscInfoPage.tsx
    EmergencyPage.tsx

  data/
    trip.ts                     # Day 1~7 일정 (DayPlan[])
    reservations.ts             # 예약현황
    hotel.ts                    # 호텔 정보 + 택시 영어 문장
    packing.ts                  # 카테고리별 준비물 (AI 컨텍스트용)
    misc.ts                     # 기타정보 페이지의 바로가기/팁/영어
    decisionRules.ts            # 가족 합의된 일정 판단 기준 (AI 가 참고)
    travelContext.ts            # 위 데이터 전부 직렬화 + 시스템 프롬프트

  hooks/
    useLocalStorage.ts

  utils/
    format.ts                   # 지도 링크, Day 테마 색상

  styles/
    globals.css
```

## 🤖 AI 여행 도우미 작동 방식

1. 홈 화면의 **🤖 AI 여행 도우미** 카드에 질문을 입력하거나 추천 질문 버튼을 누름
2. 클라이언트가 `POST /api/travel-assistant` 호출:
   ```json
   { "question": "...", "selectedDay": 5 }
   ```
3. 서버리스 함수가 다음을 시스템 프롬프트로 합쳐서 OpenAI 에 전달:
   - `ASSISTANT_SYSTEM_PROMPT` (답변 원칙, 부모님 동반 전제 등)
   - `buildTravelContextText()` (전체 일정 + 예약 + 호텔 + 준비물 + 판단 기준 직렬화)
4. 응답을 받아 `{ answer }` 로 반환
5. 클라이언트는 답변을 카드로 표시하고 최근 3개를 `localStorage` 에 저장
   (브라우저를 새로고침해도 유지)

### 비용/안전 장치
- 질문 길이 500자 제한
- 동시 호출 방지 (`inFlight` ref) → 더블 클릭 무시
- `max_tokens: 600` 으로 응답 길이 제한
- API 키 미설정 시 400/500 응답으로 안내, 앱은 정상 동작

## ✏️ 데이터 수정 위치

| 무엇을 바꾸려면 | 어디를 열어주세요 |
|---|---|
| **일정 데이터** (Day 1~7 제목·요약·코스·timeline·tips·alternatives 등) | [src/data/trip.ts](src/data/trip.ts) |
| **예약현황** | [src/data/reservations.ts](src/data/reservations.ts) |
| **호텔 정보 / 택시 영어 문장** | [src/data/hotel.ts](src/data/hotel.ts) |
| **준비물 (AI 컨텍스트용)** | [src/data/packing.ts](src/data/packing.ts) |
| **기타정보 페이지 바로가기/팁/영어** | [src/data/misc.ts](src/data/misc.ts) |
| **AI 일정 판단 기준** | [src/data/decisionRules.ts](src/data/decisionRules.ts) — `decisionRules` 배열·`familyProfile` 객체 |
| **AI 시스템 프롬프트 / 컨텍스트 직렬화** | [src/data/travelContext.ts](src/data/travelContext.ts) |
| **AI 모델 / 호출 파라미터** | [api/travel-assistant.ts](api/travel-assistant.ts) — `max_tokens`, `temperature`, 환경변수로 모델 변경 |
| **추천 질문 6개** | [src/components/QuestionSuggestions.tsx](src/components/QuestionSuggestions.tsx) — `suggestedQuestions` 배열 |
| **홈 화면 섹션 순서** | [src/pages/HomePage.tsx](src/pages/HomePage.tsx) |

> 일정 데이터를 수정하면 **AI 답변도 자동으로 새 데이터를 반영**합니다 (서버에서 매 요청마다 `buildTravelContextText()` 재생성).

## ♿ 접근성 / 부모님 친화

- 기본 글자 크기 16px, 제목 20px 이상
- 색상 대비 강화 (ocean-700 / slate-900 위주)
- 상세 정보는 펼치기로 접어두어 화면 단순화
- AI 답변은 모바일에서 짧게(~300자), 섹션/불릿 구조로 자동 정리

## 👤 Maintainer

- GitHub: [@gommilab](https://github.com/gommilab)
- Repository: <https://github.com/gommilab/sydney-family-trip>

## 📜 라이선스

가족 내부 사용 목적의 사적인 프로젝트입니다.
