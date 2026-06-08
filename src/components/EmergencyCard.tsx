import { useLocalStorage } from "../hooks/useLocalStorage";
import { tripInfo } from "../data/trip";
import { mapSearchUrl } from "../utils/format";

type EmergencyMemo = {
  insurance: string;
  contacts: string;
  clinic: string;
};

const STORAGE_KEY = "sft.emergency.v1";

export function EmergencyCard() {
  const [memo, setMemo] = useLocalStorage<EmergencyMemo>(STORAGE_KEY, {
    insurance: "",
    contacts: "",
    clinic: "",
  });

  return (
    <div className="space-y-4">
      {/* 택시 기사에게 보여줄 카드 */}
      <article className="rounded-2xl bg-white shadow-card p-5 border-2 border-ocean-200">
        <p className="text-sm font-semibold text-ocean-600 mb-2">
          🚖 택시 기사에게 보여주세요
        </p>
        <p className="text-2xl font-extrabold text-slate-900 leading-snug mb-2">
          Please take us to
        </p>
        <p className="text-3xl font-extrabold text-ocean-700 leading-tight mb-3">
          528 Kent Street,
          <br />
          Sydney CBD.
        </p>
        <p className="text-base text-slate-700 mb-4">
          {tripInfo.hotel.addressEn}
        </p>
        <a
          href={mapSearchUrl(tripInfo.hotel.address)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-ocean-700 font-semibold text-sm underline"
        >
          📍 지도에서 보기
        </a>
      </article>

      {/* 공항 이동 카드 */}
      <article className="rounded-2xl bg-white shadow-card p-5 border-2 border-warn-200">
        <p className="text-sm font-semibold text-warn-500 mb-2">
          ✈️ 공항으로 이동할 때
        </p>
        <p className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
          Please take us to
          <br />
          Sydney International Airport.
        </p>
        <p className="text-base text-slate-600">
          국제선 터미널 (T1) 이용 예정임을 함께 알려주세요.
        </p>
      </article>

      {/* 간단 영어 문장 */}
      <article className="rounded-2xl bg-white shadow-card p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          🗣️ 자주 쓰는 영어 문장
        </h3>
        <ul className="space-y-3">
          {commonPhrases.map((p) => (
            <li key={p.en} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <p className="text-base font-semibold text-slate-900">{p.en}</p>
              <p className="text-sm text-slate-500 mt-0.5">{p.ko}</p>
            </li>
          ))}
        </ul>
      </article>

      {/* 비상 연락처 */}
      <MemoField
        title="📞 비상 연락처"
        placeholder={"예) 가이드: +61-...\n호텔 프런트: +61-2-...\n한국 영사관: +61-2-2270-1100"}
        value={memo.contacts}
        onChange={(v) => setMemo((prev) => ({ ...prev, contacts: v }))}
      />

      {/* 여행자보험 */}
      <MemoField
        title="🩺 여행자보험 정보"
        placeholder={"예) 보험사 이름 / 증권번호 / 24시간 사고접수 번호"}
        value={memo.insurance}
        onChange={(v) => setMemo((prev) => ({ ...prev, insurance: v }))}
      />

      {/* 병원/약국 */}
      <MemoField
        title="🏥 병원·약국 메모"
        placeholder={"예) 호텔 근처 24시간 약국, CBD 한국어 가능 클리닉 등"}
        value={memo.clinic}
        onChange={(v) => setMemo((prev) => ({ ...prev, clinic: v }))}
      />

      <article className="rounded-2xl bg-warn-50 border border-warn-200 p-4 text-sm text-warn-500">
        ⚠️ 호주 응급 신고 번호: <span className="font-bold">000</span> (경찰·소방·구급 공통)
      </article>
    </div>
  );
}

function MemoField({
  title,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <article className="rounded-2xl bg-white shadow-card p-4">
      <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-slate-200 p-3 text-base text-slate-800 focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-100 resize-y"
      />
      <p className="text-xs text-slate-400 mt-1">
        입력한 내용은 이 기기에만 저장됩니다 (localStorage).
      </p>
    </article>
  );
}

const commonPhrases = [
  {
    en: "Could you take a photo of us, please?",
    ko: "사진 한 장 찍어주실 수 있나요?",
  },
  {
    en: "Where is the nearest pharmacy?",
    ko: "가장 가까운 약국이 어디인가요?",
  },
  {
    en: "I don't feel well. I need help.",
    ko: "몸이 좋지 않습니다. 도움이 필요합니다.",
  },
  {
    en: "Is this seat available for elderly passengers?",
    ko: "이 자리는 어르신이 앉아도 되나요?",
  },
  {
    en: "Could we have a table for four, please?",
    ko: "4명 자리 부탁드립니다.",
  },
];
