import { useEffect, useRef } from "react";
import { TravelAssistant } from "./TravelAssistant";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * "AI 질문하기" 를 띄우는 하단 시트 / 모달.
 * - 모바일: 하단에서 슬라이드업되는 바텀시트
 * - 데스크톱(sm+): 화면 중앙 모달
 * - Esc / 배경 클릭 / X 버튼으로 닫힘
 */
export function AssistantModal({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // 배경 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 닫기 버튼에 포커스
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-modal-title"
      aria-label="AI 질문하기"
    >
      {/* 백드롭 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 cursor-default animate-[fadeIn_120ms_ease-out]"
      />

      {/* 본문 패널 — 모바일: 바텀시트 / 데스크톱: 중앙 정렬 카드 */}
      <div
        className="
          absolute inset-x-0 bottom-0 max-h-[88vh]
          sm:inset-x-0 sm:bottom-auto sm:top-[8vh] sm:max-h-[80vh]
          sm:mx-auto sm:w-full sm:max-w-md
          bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl
          flex flex-col
          animate-[slideUp_180ms_ease-out]
        "
      >
        {/* 헤더 */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2
              id="assistant-modal-title"
              className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5"
            >
              <span aria-hidden>🤖</span> AI 질문하기
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              일정·준비물·부모님 컨디션·대안 일정을 물어보세요.
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="AI 질문하기 닫기"
            className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-500 text-2xl flex items-center justify-center flex-shrink-0"
          >
            ×
          </button>
        </header>

        {/* 스크롤 본문 */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <TravelAssistant />
        </div>
      </div>
    </div>
  );
}
