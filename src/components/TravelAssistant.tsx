import { useCallback, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { QuestionSuggestions } from "./QuestionSuggestions";
import {
  AssistantAnswerCard,
  type AssistantTurn,
} from "./AssistantAnswerCard";

const HISTORY_KEY = "sft.assistant.history.v1";
const MAX_HISTORY = 3;

/**
 * "AI 질문하기" 의 본문 (입력 + 추천질문 + 최근 답변).
 * 외부 카드/모달이 chrome 을 제공한다고 가정하고, 자체 wrapper 는 두지 않는다.
 */
export function TravelAssistant() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<AssistantTurn[]>(
    HISTORY_KEY,
    []
  );
  const inFlight = useRef(false);

  const ask = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question || inFlight.current) return;

      inFlight.current = true;
      setLoading(true);
      setError(null);

      try {
        // BASE_URL 은 "/" (Vercel/로컬) 또는 "/sydney-family-trip/" (GH Pages)
        const res = await fetch(
          `${import.meta.env.BASE_URL}api/travel-assistant`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ question }),
          }
        );

        // 정적 호스팅(GitHub Pages 등): /api/* 가 존재하지 않음
        if (res.status === 404) {
          setError(
            "이 배포 환경에서는 AI 질문하기가 동작하지 않습니다. (서버 API 가 필요한 기능이므로 Vercel 배포에서 이용 가능)"
          );
          return;
        }

        const data = (await res
          .json()
          .catch(() => ({}))) as { answer?: string; error?: string };

        if (!res.ok || !data.answer) {
          setError(data.error ?? "잠시 후 다시 시도해 주세요.");
          return;
        }

        const turn: AssistantTurn = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          question,
          answer: data.answer,
          createdAt: Date.now(),
        };
        setHistory((prev) => [turn, ...prev].slice(0, MAX_HISTORY));
        setInput("");
      } catch (e) {
        console.error(e);
        setError("네트워크 오류입니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
        inFlight.current = false;
      }
    },
    [setHistory]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="sr-only" htmlFor="assistant-input">
          질문 입력
        </label>
        <textarea
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="궁금한 점을 입력하세요 (예: 오늘 부모님이 피곤하면?)"
          rows={2}
          maxLength={500}
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 p-3 text-[15px] text-slate-800 focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-100 resize-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full rounded-xl bg-ocean-600 hover:bg-ocean-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-2.5 transition"
        >
          {loading ? "답변을 준비 중입니다..." : "질문하기"}
        </button>
      </form>

      <QuestionSuggestions onPick={ask} disabled={loading} />

      {error && (
        <div className="rounded-xl border border-warn-200 bg-warn-50 text-warn-500 text-sm p-3">
          ⚠️ {error}
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">
              최근 답변 (최대 {MAX_HISTORY}개 저장)
            </p>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="text-xs text-slate-400 hover:text-slate-600 underline"
            >
              지우기
            </button>
          </div>
          {history.map((turn) => (
            <AssistantAnswerCard key={turn.id} turn={turn} />
          ))}
        </div>
      )}
    </div>
  );
}
