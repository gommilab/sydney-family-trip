type Meta = { gradient: string; icon: string; label: string };

const placeholderMap: Record<string, Meta> = {
  // Day 1
  "bondi-beach": {
    gradient: "from-cyan-300 via-sky-400 to-blue-500",
    icon: "🏖️",
    label: "본다이 비치",
  },
  "east-coast": {
    gradient: "from-sky-400 via-blue-400 to-indigo-500",
    icon: "🌅",
    label: "동부해안",
  },
  "sydney-uni": {
    gradient: "from-amber-300 via-amber-500 to-orange-600",
    icon: "🏛️",
    label: "시드니대학교",
  },

  // Day 2
  "opera-house": {
    gradient: "from-rose-200 via-amber-200 to-sky-400",
    icon: "🎭",
    label: "오페라하우스",
  },
  qvb: {
    gradient: "from-yellow-200 via-amber-300 to-rose-400",
    icon: "🏛️",
    label: "QVB",
  },
  "darling-harbour": {
    gradient: "from-indigo-700 via-purple-600 to-pink-500",
    icon: "🌃",
    label: "달링하버 야경",
  },

  // Day 3
  "scenic-world": {
    gradient: "from-emerald-400 via-emerald-500 to-teal-700",
    icon: "🚠",
    label: "Scenic World",
  },
  "three-sisters": {
    gradient: "from-orange-300 via-rose-400 to-purple-600",
    icon: "⛰️",
    label: "세자매봉",
  },
  featherdale: {
    gradient: "from-lime-300 via-green-400 to-emerald-600",
    icon: "🐨",
    label: "페더데일",
  },

  // Day 4
  "sea-cliff-bridge": {
    gradient: "from-sky-400 via-cyan-500 to-teal-600",
    icon: "🌉",
    label: "Sea Cliff Bridge",
  },
  kiama: {
    gradient: "from-blue-400 via-cyan-400 to-emerald-400",
    icon: "💦",
    label: "키아마 블로우홀",
  },
  gerringong: {
    gradient: "from-lime-300 via-emerald-400 to-sky-500",
    icon: "🌾",
    label: "제링공",
  },

  // Day 5
  "sea-life": {
    gradient: "from-cyan-400 via-blue-500 to-indigo-700",
    icon: "🐠",
    label: "SEA LIFE",
  },
  westfield: {
    gradient: "from-pink-300 via-fuchsia-400 to-purple-500",
    icon: "🛍️",
    label: "Westfield",
  },
  "lego-store": {
    gradient: "from-red-400 via-yellow-400 to-blue-500",
    icon: "🧱",
    label: "LEGO Store",
  },

  // Day 6
  "whale-cruise": {
    gradient: "from-slate-700 via-blue-700 to-cyan-500",
    icon: "🐋",
    label: "고래 크루즈",
  },
  "sydney-harbour": {
    gradient: "from-blue-500 via-sky-400 to-cyan-300",
    icon: "⛵",
    label: "시드니 하버",
  },
  ocean: {
    gradient: "from-blue-700 via-sky-500 to-cyan-400",
    icon: "🌊",
    label: "외해",
  },

  // Day 7
  airport: {
    gradient: "from-slate-400 via-slate-500 to-slate-700",
    icon: "🛫",
    label: "시드니 공항",
  },
  plane: {
    gradient: "from-sky-300 via-sky-500 to-indigo-600",
    icon: "✈️",
    label: "귀국 비행",
  },
  suitcase: {
    gradient: "from-amber-300 via-amber-500 to-rose-500",
    icon: "🧳",
    label: "짐 정리",
  },
};

export function PlaceholderImage({
  name,
  className = "",
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const meta =
    placeholderMap[name] ?? {
      gradient: "from-slate-300 to-slate-500",
      icon: "📷",
      label: name,
    };

  const iconSize = size === "lg" ? "text-5xl" : size === "sm" ? "text-2xl" : "text-4xl";
  const labelSize = size === "lg" ? "text-base" : size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${meta.gradient} flex flex-col items-center justify-center text-white ${className}`}
      role="img"
      aria-label={meta.label}
    >
      <span className={`${iconSize} drop-shadow-sm`} aria-hidden>
        {meta.icon}
      </span>
      <span
        className={`${labelSize} font-bold mt-1 px-2 text-center drop-shadow`}
      >
        {meta.label}
      </span>
    </div>
  );
}
