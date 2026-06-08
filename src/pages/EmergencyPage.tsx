import { EmergencyCard } from "../components/EmergencyCard";

export function EmergencyPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white shadow-card p-4">
        <h2 className="text-lg font-bold text-slate-900">긴급 정보</h2>
        <p className="text-sm text-slate-500 mt-1">
          숙소 주소, 택시 기사용 카드, 자주 쓰는 영어 문장, 비상 연락처를 한
          화면에 모았습니다.
        </p>
      </section>
      <EmergencyCard />
    </div>
  );
}
