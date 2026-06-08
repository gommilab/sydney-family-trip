import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { miscShortcuts, operationTips, travelPhrases } from "../data/misc";
import {
  shoppingItems,
  shoppingPlaces,
  shoppingTips,
  type ShoppingCategory,
} from "../data/shopping";

const CATEGORIES: (ShoppingCategory | "전체")[] = [
  "전체",
  "아이/가족 취향",
  "호주 특산 식품",
  "뷰티/스킨케어",
  "건강식품",
  "의류/기념품",
];

export function MiscInfoPage() {
  const [filter, setFilter] = useState<ShoppingCategory | "전체">("전체");

  const filteredItems = useMemo(
    () =>
      filter === "전체"
        ? shoppingItems
        : shoppingItems.filter((i) => i.category === filter),
    [filter]
  );

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-4">
        <h2 className="text-lg font-bold text-slate-900">기타정보</h2>
        <p className="text-sm text-slate-500 mt-1">
          쇼핑 목록·일정 운영 팁·영어 표현·긴급 정보 등 여행에 필요한 부가 정보입니다.
        </p>
      </section>

      {/* 바로가기 카드들 */}
      <nav aria-label="기타 바로가기" className="space-y-2">
        {miscShortcuts.map((s) => (
          <Link
            key={s.id}
            to={s.to}
            className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 shadow-card p-4 active:bg-slate-50 transition"
          >
            <span
              className="w-11 h-11 rounded-full bg-ocean-50 flex items-center justify-center text-xl flex-shrink-0"
              aria-hidden
            >
              {s.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-slate-900">{s.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {s.description}
              </p>
            </div>
            <span aria-hidden className="text-slate-300 text-xl">
              ›
            </span>
          </Link>
        ))}
      </nav>

      {/* 쇼핑 목록 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-1.5">
          <span aria-hidden>🛍️</span> 시드니 쇼핑 목록
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          대표 쇼핑 아이템과 어디서 살 수 있는지 정리해 두었어요.
        </p>

        {/* 카테고리 필터 */}
        <div
          role="tablist"
          aria-label="쇼핑 카테고리 필터"
          className="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-2"
        >
          {CATEGORIES.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-bold border transition ${
                  active
                    ? "bg-ocean-600 text-white border-ocean-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-ocean-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <ul className="mt-3 space-y-3">
          {filteredItems.map((item) => (
            <li
              key={item.name}
              className="rounded-xl border border-slate-200 p-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-2xl leading-none" aria-hidden>
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[15px] font-bold text-slate-900">
                      {item.name}
                    </p>
                    <span className="text-[10px] font-bold text-ocean-700 bg-ocean-50 border border-ocean-100 rounded-full px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1.5">
                    <span className="font-semibold text-slate-600">어디서</span>{" "}
                    · {item.where.join(" / ")}
                  </p>
                  {item.note && (
                    <p className="text-[13px] text-slate-700 mt-1.5 leading-relaxed">
                      💡 {item.note}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 쇼핑 장소 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <span aria-hidden>📍</span> 대표 쇼핑 장소
        </h3>
        <ul className="space-y-2.5">
          {shoppingPlaces.map((p) => (
            <li
              key={p.name}
              className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[15px] font-bold text-slate-900">
                  {p.name}
                </p>
                <span className="text-[10px] font-bold text-sand-500 bg-sand-50 border border-sand-200 rounded-full px-2 py-0.5">
                  {p.type}
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-1">{p.area}</p>
              {p.note && (
                <p className="text-[13px] text-slate-700 mt-1 leading-relaxed">
                  {p.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 쇼핑 팁 */}
      <section className="rounded-2xl bg-leaf-50 border border-leaf-200 p-5">
        <h3 className="text-base font-bold text-leaf-500 mb-2 flex items-center gap-1.5">
          <span aria-hidden>✅</span> 쇼핑 팁
        </h3>
        <ul className="space-y-1.5 text-[14px] text-slate-800 leading-relaxed">
          {shoppingTips.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-leaf-500 mt-1 text-xs" aria-hidden>
                ●
              </span>
              <span className="flex-1">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 일정 운영 팁 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <span aria-hidden>💡</span> 일정 운영 팁
        </h3>
        <ul className="space-y-3">
          {operationTips.map((t) => (
            <li
              key={t.title}
              className="border-l-2 border-ocean-200 pl-3 py-0.5"
            >
              <p className="text-sm font-bold text-ocean-700">{t.title}</p>
              <p className="text-[14px] text-slate-700 leading-relaxed mt-0.5">
                {t.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 자주 쓰는 영어 표현 */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-card p-5">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <span aria-hidden>🗣️</span> 자주 쓰는 영어 표현
        </h3>
        <ul className="space-y-3">
          {travelPhrases.map((p) => (
            <li
              key={p.en}
              className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
            >
              <p className="text-[15px] font-semibold text-slate-900">{p.en}</p>
              <p className="text-sm text-slate-500 mt-0.5">{p.ko}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-ocean-50 border border-ocean-100 p-4">
        <p className="text-sm text-ocean-700">
          ℹ️ 쇼핑 목록은
          <span className="font-mono mx-1 text-xs">src/data/shopping.ts</span>
          , 나머지 바로가기·팁·영어 표현은
          <span className="font-mono mx-1 text-xs">src/data/misc.ts</span>
          에서 수정할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
