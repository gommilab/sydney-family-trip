export const dayThemeColor = (day: number) => {
  const palette = [
    "bg-ocean-500",
    "bg-leaf-400",
    "bg-warn-400",
    "bg-sand-400",
    "bg-ocean-400",
    "bg-leaf-500",
    "bg-slate-500",
  ];
  return palette[(day - 1) % palette.length];
};

export const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
