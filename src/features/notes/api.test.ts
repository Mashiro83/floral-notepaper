import { invoke } from "@tauri-apps/api/core";
import { i18n } from "../../locales";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getErrorMessage, setSurfaceAlwaysOnTop } from "./api";

vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

describe("notes api error localization", () => {
  beforeEach(() => {
    vi.mocked(invoke).mockReset();
  });

  test("persists a note surface always-on-top preference through Rust", async () => {
    vi.mocked(invoke).mockResolvedValue({ id: "note-1", surfaceAlwaysOnTop: false });

    await setSurfaceAlwaysOnTop("note-1", false);

    expect(invoke).toHaveBeenCalledWith("notes_set_surface_always_on_top", {
      id: "note-1",
      enabled: false,
    });
  });

  test("localizes structured backend errors with interpolation details", () => {
    expect(
      getErrorMessage({
        code: "categoryAlreadyExists",
        message: "分类「工作」已存在",
        details: { category: "工作" },
      }),
    ).toBe("分类「工作」已存在");
  });

  test("localizes shortcut configuration errors with settings labels", () => {
    expect(
      getErrorMessage({
        code: "unsupportedShortcut",
        message: "unsupported globalShortcut shortcut config: Ctrl+",
        details: { field: "globalShortcut" },
      }),
    ).toBe("快捷记录快捷键 配置无效");
  });

  test("parses serialized backend error strings when a structured payload is unavailable", () => {
    expect(getErrorMessage("noteNotFound: Note note-1 was not found")).toBe("找不到该笔记");
  });

  test("localizes serialized category errors when interpolation details can be recovered", () => {
    const translate = i18n.getFixedT("en-US");

    expect(getErrorMessage("categoryNotFound: 分类「工作」不存在", translate)).toBe(
      'Category "工作" not found',
    );
    expect(getErrorMessage("categoryAlreadyExists: 分类「工作」已存在", translate)).toBe(
      'Category "工作" already exists',
    );
  });

  test("falls back to the backend message for unknown error codes", () => {
    expect(
      getErrorMessage({
        code: "mysteryError",
        message: "something went wrong",
      }),
    ).toBe("something went wrong");
  });
});
