import { describe, expect, test } from "vitest";
import { MAX_PAGE_ZOOM, MIN_PAGE_ZOOM, nextPageZoom } from "./pageZoom";

describe("main window page zoom", () => {
  test("zooms with main-row and numpad shortcuts", () => {
    expect(nextPageZoom(1, "-", "Minus")).toBe(0.8);
    expect(nextPageZoom(1, "=", "Equal")).toBe(1.2);
    expect(nextPageZoom(1, "+", "NumpadAdd")).toBe(1.2);
    expect(nextPageZoom(1, "Subtract", "NumpadSubtract")).toBe(0.8);
  });

  test("resets with zero and ignores unrelated keys", () => {
    expect(nextPageZoom(2, "0", "Digit0")).toBe(1);
    expect(nextPageZoom(1, "s", "KeyS")).toBeNull();
  });

  test("clamps repeated zoom changes", () => {
    expect(nextPageZoom(MIN_PAGE_ZOOM, "-", "Minus")).toBe(MIN_PAGE_ZOOM);
    expect(nextPageZoom(MAX_PAGE_ZOOM, "=", "Equal")).toBe(MAX_PAGE_ZOOM);
  });
});
