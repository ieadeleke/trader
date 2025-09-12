import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatter with thousands separators. Defaults to US-style with 2 decimals.
export function formatMoney(
  value: number | string | null | undefined,
  opts: { symbol?: string; decimals?: number } = {}
) {
  const { symbol = "$", decimals = 2 } = opts;
  const n = Number(value ?? 0);
  if (!isFinite(n)) return `${symbol}0.00`;
  const formatted = n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${symbol}${formatted}`;
}
