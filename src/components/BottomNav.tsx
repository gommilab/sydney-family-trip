import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "홈", icon: "🏠", end: true },
  { to: "/itinerary", label: "일정", icon: "🗓️" },
  { to: "/reservations", label: "예약", icon: "🧾" },
  { to: "/hotel", label: "호텔", icon: "🏨" },
  { to: "/misc", label: "기타", icon: "📌" },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 pb-[env(safe-area-inset-bottom)]"
      aria-label="주요 탐색"
    >
      <ul className="grid grid-cols-5 mx-auto max-w-screen-sm">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-semibold transition ${
                  isActive
                    ? "text-ocean-700"
                    : "text-slate-500 hover:text-ocean-600"
                }`
              }
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
