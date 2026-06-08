export const suggestedQuestions = [
  "오늘 부모님이 피곤하면?",
  "내일 준비물 알려줘",
  "비 오면 대안 일정은?",
  "고래 투어 주의사항",
  "호텔 주소 영어로",
  "자유일정 추천",
] as const;

export function QuestionSuggestions({
  onPick,
  disabled,
}: {
  onPick: (q: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 mb-2">추천 질문</p>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={disabled}
            onClick={() => onPick(q)}
            className="text-sm rounded-full border border-ocean-200 bg-white hover:bg-ocean-50 text-ocean-700 px-3 py-1.5 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
