export const DEFAULT_PAGE_ZOOM = 1;
export const PAGE_ZOOM_STEP = 0.2;
export const MIN_PAGE_ZOOM = 0.2;
export const MAX_PAGE_ZOOM = 5;

export function nextPageZoom(current: number, key: string, code = ""): number | null {
  if (key === "0" || code === "Numpad0") return DEFAULT_PAGE_ZOOM;

  let next: number;
  if (key === "-" || key === "_" || code === "Minus" || code === "NumpadSubtract") {
    next = current - PAGE_ZOOM_STEP;
  } else if (key === "=" || key === "+" || code === "Equal" || code === "NumpadAdd") {
    next = current + PAGE_ZOOM_STEP;
  } else {
    return null;
  }

  return Math.min(MAX_PAGE_ZOOM, Math.max(MIN_PAGE_ZOOM, Number(next.toFixed(1))));
}
