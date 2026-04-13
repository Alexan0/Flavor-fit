export function formatCompactNumber(value?: number | null) {
  if (!value) return 0;

  return new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 1
  }).format(value);
}
