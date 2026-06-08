import type { ReactNode } from "react";

export type AssistantTurn = {
  id: string;
  question: string;
  answer: string;
  createdAt: number;
};

/**
 * AI 답변을 간단한 한글 마크다운(섹션 헤더 + 불릿)으로 렌더한다.
 * - "추천:", "이유:", "주의사항:" 처럼 콜론으로 끝나는 줄 → 섹션 헤더
 * - "- " 또는 "• " 로 시작하는 줄 → 불릿
 * - 그 외 → 일반 문단
 */
export function AssistantAnswerCard({ turn }: { turn: AssistantTurn }) {
  return (
    <article className="rounded-2xl bg-ocean-50/60 border border-ocean-200 p-4">
      <p className="text-[12px] font-semibold text-ocean-700 mb-1">
        🙋 질문
      </p>
      <p className="text-[14px] text-slate-800 mb-3 leading-snug">
        {turn.question}
      </p>

      <p className="text-[12px] font-semibold text-ocean-700 mb-1">
        🤖 답변
      </p>
      <div className="text-[15px] text-slate-900 leading-relaxed">
        {renderAnswer(turn.answer)}
      </div>
    </article>
  );
}

function renderAnswer(text: string): ReactNode {
  const lines = text.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let bulletGroup: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletGroup.length === 0) return;
    blocks.push(
      <ul
        key={`ul-${key++}`}
        className="my-1.5 space-y-1 list-disc pl-5 marker:text-ocean-500"
      >
        {bulletGroup.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    );
    bulletGroup = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") {
      flushBullets();
      continue;
    }
    const bulletMatch = line.match(/^[-•·]\s+(.*)$/);
    if (bulletMatch) {
      bulletGroup.push(bulletMatch[1]);
      continue;
    }
    flushBullets();
    if (line.endsWith(":") && line.length < 30) {
      blocks.push(
        <p
          key={`h-${key++}`}
          className="text-[13px] font-bold text-ocean-700 mt-2"
        >
          {line.replace(/:$/, "")}
        </p>
      );
    } else {
      blocks.push(
        <p key={`p-${key++}`} className="mt-1">
          {line}
        </p>
      );
    }
  }
  flushBullets();

  return <>{blocks}</>;
}
