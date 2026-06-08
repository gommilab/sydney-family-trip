import { useCallback, useState } from "react";
import { ScheduleSummaryList } from "../components/ScheduleSummaryList";

export function HomePage() {
  // 한 번에 하나의 Day 만 펼침. null = 전부 접힘.
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const handleToggle = useCallback((day: number) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  }, []);

  return (
    <ScheduleSummaryList
      expandedDay={expandedDay}
      onToggle={handleToggle}
    />
  );
}
