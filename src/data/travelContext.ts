/**
 * AI 도우미(AI 질문하기) 가 사용하는 시스템 컨텍스트 빌더.
 *
 * 앱의 모든 데이터(tripDays, reservations, hotelInfo, packing, decisionRules)를
 * 모아서 OpenAI 시스템 프롬프트에 넣을 한 덩어리의 텍스트로 만든다.
 *
 * 서버(api/travel-assistant.ts)와 클라이언트(필요 시)에서 모두 import 가능하도록
 * 순수 함수로 구현되어 있다.
 */

import { tripDays, tripInfo } from "./trip";
import { reservations } from "./reservations";
import { hotelInfo } from "./hotel";
import { packingByCategory } from "./packing";
import { decisionRules, familyProfile } from "./decisionRules";
import { shoppingItems, shoppingPlaces, shoppingTips } from "./shopping";

export function buildTravelContextText(): string {
  const sections: string[] = [];

  // 가족 프로필
  sections.push(`## 가족 프로필
- 구성: ${familyProfile.composition}
- 동반: ${familyProfile.seniors}
- 여행 스타일: ${familyProfile.travelStyle}
- 우선순위:
${familyProfile.priorities.map((p) => `  - ${p}`).join("\n")}`);

  // 여행 기본 정보
  sections.push(`## 여행 기본
- 이름: ${tripInfo.name} (${tripInfo.subtitle})
- 출발: ${tripInfo.startDate}
- 총 일수: ${tripInfo.totalDays}일
- 숙소: ${tripInfo.hotel.nameKo} · ${tripInfo.hotel.addressEn}`);

  // 일정
  sections.push(
    `## 전체 일정 (Day 1~${tripDays.length})\n` +
      tripDays
        .map((d) => {
          const timeline = d.timeline
            .map((t) => `  - ${t.time}: ${t.activity}`)
            .join("\n");
          return `### Day ${d.day} · ${d.date ?? "?"} (${d.weekday}) ${d.title}
- 한 줄 요약: ${d.shortSummary}
- 핵심: ${d.highlight}
- 주요 지역: ${d.areas.join(", ")}
- 강도(내부 참고): ${d.intensity}
- 시간대별 일정:
${timeline}
- 코스 흐름: ${d.routeSummary.join(" → ")}
- 일정 포인트:
${d.highlights.map((h) => `  - ${h}`).join("\n")}
- 부모님 동반 팁:
${d.tips.map((t) => `  - ${t}`).join("\n")}
- 컨디션이 안 좋을 때 대안:
${d.alternatives.map((a) => `  - ${a}`).join("\n")}`;
        })
        .join("\n\n")
  );

  // 예약현황
  sections.push(
    `## 예약현황\n` +
      reservations
        .map((r) => {
          const dayPart = r.day ? `[Day ${r.day}] ` : "";
          const vendorPart = r.vendor ? ` (예약처: ${r.vendor})` : "";
          const notePart = r.note ? ` — ${r.note}` : "";
          const urlPart = r.url ? ` · 상품 URL: ${r.url}` : "";
          return `- ${dayPart}${r.name}: ${r.status}${vendorPart}${notePart}${urlPart}`;
        })
        .join("\n")
  );

  // 호텔 정보
  const r = hotelInfo.reservation;
  const reservationLines = [
    `- 예약 채널: Agoda (Booking.com 연동)`,
    r.agodaBookingId || r.referenceNo
      ? `- Agoda 예약 번호: ${r.agodaBookingId || "(비공개)"}${
          r.referenceNo ? ` / 참조: ${r.referenceNo}` : ""
        }`
      : null,
    r.guestName
      ? `- 예약자: ${r.guestName}${
          r.memberId ? ` (Agoda 회원 ID: ${r.memberId})` : ""
        }`
      : null,
    `- 체크인: ${r.checkIn} / 체크아웃: ${r.checkOut} (총 ${r.nights}박)`,
    `- 객실: ${r.roomType}${r.bedConfig ? ` (${r.bedConfig})` : ""} · ${
      r.rooms
    }개`,
    `- 인원: 성인 ${r.adults}명${r.children ? `, 아동 ${r.children}명` : ""}`,
    r.totalAmount
      ? `- 총 요금: ${r.totalAmount} · ${r.paymentMethod}`
      : `- 결제: ${r.paymentMethod}`,
    `- 포함 시설: ${r.amenities.join(", ")}`,
    `- 객실 선호: ${r.preferences.join(", ")}`,
    r.arrivalTimeRequest ? `- 도착 시간 요청: ${r.arrivalTimeRequest}` : null,
    r.additionalRequest ? `- 추가 요청: ${r.additionalRequest}` : null,
    `- 취소 정책: ${r.cancellationPolicy}`,
  ].filter(Boolean);

  sections.push(`## 호텔 정보
- 이름: ${hotelInfo.nameKo}${hotelInfo.nameEn ? ` (${hotelInfo.nameEn})` : ""}
- 주소(영문): ${hotelInfo.addressEn}
- 주소(국문 표기): ${hotelInfo.address}
- 체크인 메모: ${hotelInfo.checkInNote}
- 체크아웃 메모: ${hotelInfo.checkOutNote}
- 공항 이동: ${hotelInfo.airportNote}
${hotelInfo.amenitiesNote ? `- 편의시설/주변: ${hotelInfo.amenitiesNote}` : ""}

### 예약 확정 정보
${reservationLines.join("\n")}

### 택시 기사용 영어 문장
${hotelInfo.taxiPhrases.map((p) => `- ${p.label}: "${p.en}"`).join("\n")}`);

  // 준비물
  sections.push(
    `## 준비물 (카테고리별)\n` +
      packingByCategory
        .map((c) => {
          const days = c.forDays?.length
            ? ` [Day ${c.forDays.join(", ")}]`
            : "";
          return `- ${c.title}${days}: ${c.items.join(", ")}`;
        })
        .join("\n")
  );

  // 쇼핑 가이드
  sections.push(
    `## 시드니 쇼핑 아이템\n` +
      shoppingItems
        .map(
          (i) =>
            `- [${i.category}] ${i.name} — 어디서: ${i.where.join(" / ")}${
              i.note ? ` · 메모: ${i.note}` : ""
            }`
        )
        .join("\n")
  );

  sections.push(
    `## 시드니 쇼핑 장소\n` +
      shoppingPlaces
        .map(
          (p) =>
            `- ${p.name} (${p.type}, ${p.area})${p.note ? ` — ${p.note}` : ""}`
        )
        .join("\n")
  );

  sections.push(
    `## 쇼핑 팁\n` + shoppingTips.map((t) => `- ${t}`).join("\n")
  );

  // 의사결정 규칙
  sections.push(
    `## 일정 판단 기준 (가족 합의된 규칙)\n` +
      decisionRules.map((r) => `- ${r}`).join("\n")
  );

  return sections.join("\n\n");
}

export const ASSISTANT_SYSTEM_PROMPT = `너는 "우리 가족 시드니 여행(2026년)" 전용 AI 도우미다.
일반 여행 상담사가 아니라, 아래 컨텍스트에 정의된 7일 시드니 가족여행 일정표와 가족 조건을 바탕으로 답변한다.

[답변 원칙]
1. 80대 부모님 동반 여행을 최우선으로 고려한다. 무리한 이동, 늦은 귀환, 장시간 도보를 피한다.
2. 답변은 반드시 컨텍스트(일정/예약/호텔/준비물/판단기준)에 근거한다. 컨텍스트에 없는 사실(정확한 가격, 실시간 날씨, 미예약 시간 등)은 추측하지 않고 "예약 정보에서 확인 필요" 또는 "실시간 확인 필요"라고 안내한다.
3. 답변은 한국어로, 모바일에서 읽기 쉽게 짧고 명확하게 작성한다. 한 답변은 가급적 200~350자 이내로 유지한다.
4. 필요하면 다음 형식을 사용한다:
   추천:
   - ...

   이유:
   - ...

   주의사항:
   - ...
5. 가족이 바로 실행할 수 있는 형태로 답한다. 추상적인 일반론은 피한다.
6. 의료/약 복용 지시는 단정하지 말고, 멀미약 등은 "사전에 의사·약사 확인"이라고 안내한다.
7. 영어 문장이 필요한 답변은 컨텍스트에 정의된 호텔/공항 문장을 그대로 인용한다.
8. 사용자가 selectedDay 를 함께 보냈다면, 그 Day 의 일정과 다음/이전 Day 의 영향을 함께 고려한다.
9. 일정 강도(높음/중간/낮음) 라벨을 사용자에게 노골적으로 노출하지는 말되, 답변의 톤을 정할 때는 참고한다.`;
