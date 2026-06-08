/**
 * AI 여행 도우미 서버리스 함수.
 *
 * 배포 환경:
 *  - Vercel: 이 파일이 `api/travel-assistant.ts` 경로에 있으면
 *    Vercel 이 자동으로 `/api/travel-assistant` 엔드포인트로 노출한다 (Node 런타임).
 *  - Vite dev: vite.config.ts 의 customApi 플러그인이 같은 핸들러를 호출한다.
 *
 * 환경변수:
 *  - OPENAI_API_KEY (필수)
 *  - OPENAI_MODEL   (선택, 기본값 "gpt-4o-mini")
 */

import type { IncomingMessage, ServerResponse } from "node:http";
import {
  ASSISTANT_SYSTEM_PROMPT,
  buildTravelContextText,
} from "../src/data/travelContext";

type AssistantRequestBody = {
  question?: unknown;
  selectedDay?: unknown;
};

const json = (
  res: ServerResponse,
  status: number,
  body: Record<string, unknown>
) => {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method Not Allowed" });
  }

  let body: AssistantRequestBody;
  try {
    const raw = await readBody(req);
    body = raw ? (JSON.parse(raw) as AssistantRequestBody) : {};
  } catch {
    return json(res, 400, { error: "Invalid JSON body" });
  }

  const question =
    typeof body.question === "string" ? body.question.trim() : "";
  const selectedDay =
    typeof body.selectedDay === "number" ? body.selectedDay : null;

  if (!question) {
    return json(res, 400, { error: "question 은 필수입니다." });
  }
  if (question.length > 500) {
    return json(res, 400, {
      error: "질문이 너무 깁니다. 500자 이내로 입력해주세요.",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(res, 500, {
      error:
        "OPENAI_API_KEY 가 설정되지 않았습니다. .env.local 또는 호스팅 환경변수에 추가해주세요.",
    });
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const userMessageParts = [
    selectedDay
      ? `[선택된 Day: Day ${selectedDay}]`
      : "[선택된 Day: 없음 — 컨텍스트 전반을 고려하여 답변]",
    `사용자 질문: ${question}`,
  ];

  const systemContent = `${ASSISTANT_SYSTEM_PROMPT}

[여행 컨텍스트 시작]
${buildTravelContextText()}
[여행 컨텍스트 끝]`;

  try {
    const upstream = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          max_tokens: 600,
          messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userMessageParts.join("\n\n") },
          ],
        }),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("OpenAI error", upstream.status, errText);
      return json(res, 502, {
        error:
          "AI 서버 응답에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer = data.choices?.[0]?.message?.content?.trim() ?? "";

    if (!answer) {
      return json(res, 502, {
        error: "AI 응답이 비어있습니다. 잠시 후 다시 시도해 주세요.",
      });
    }

    return json(res, 200, { answer });
  } catch (err) {
    console.error("travel-assistant handler error", err);
    return json(res, 500, {
      error: "내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
}
