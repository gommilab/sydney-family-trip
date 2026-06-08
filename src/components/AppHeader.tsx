import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AssistantModal } from "./AssistantModal";

const titleMap: { test: (path: string) => boolean; title: string }[] = [
  { test: (p) => p === "/", title: "우리 가족 시드니 여행(2026년)" },
  { test: (p) => p.startsWith("/itinerary/"), title: "일정 상세" },
  { test: (p) => p === "/itinerary", title: "전체 일정" },
  { test: (p) => p === "/reservations", title: "예약현황" },
  { test: (p) => p === "/hotel", title: "호텔정보" },
  { test: (p) => p === "/misc", title: "기타정보" },
  { test: (p) => p === "/emergency", title: "긴급 정보" },
];

export function AppHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [aiOpen, setAiOpen] = useState(false);
  const isRoot = pathname === "/";
  const title =
    titleMap.find((t) => t.test(pathname))?.title ??
    "우리 가족 시드니 여행(2026년)";

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-screen-sm flex items-center justify-between gap-2 px-4 h-14">
          {/* 좌측 */}
          {isRoot ? (
            <span className="text-base font-extrabold text-ocean-700 flex-shrink-0">
              🇦🇺 Sydney Trip
            </span>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-ocean-700 font-semibold flex-shrink-0"
              aria-label="뒤로가기"
            >
              <span aria-hidden className="text-xl">
                ‹
              </span>
              <span>뒤로</span>
            </button>
          )}

          {/* 중앙 타이틀 */}
          <span className="text-sm font-bold text-slate-700 truncate flex-1 text-center">
            {title}
          </span>

          {/* 우측 — AI 질문하기 버튼 */}
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            aria-label="AI 질문하기 열기"
            className="inline-flex items-center gap-1 rounded-full bg-ocean-100 hover:bg-ocean-200 text-ocean-700 px-3 py-1.5 text-sm font-bold transition flex-shrink-0"
          >
            <span aria-hidden>🤖</span>
            <span>AI 질문하기</span>
          </button>
        </div>
      </header>

      <AssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}
