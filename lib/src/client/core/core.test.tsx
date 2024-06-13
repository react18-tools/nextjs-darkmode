import { act, cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { Core } from "./core";
import { useMode } from "../../hooks";
import { COOKIE_KEY, DARK, LIGHT, MEDIA } from "../../constants";

describe("theme-switcher", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(<Core />);
  });

  test("Test changing color scheme preference", ({ expect }) => {
    const { result } = renderHook(() => useMode());
    act(() => {
      result.current.setMode(DARK);
    });
    expect(result.current.mode).toBe(DARK);
  });

  test("test storing state to localStorage and DOM updates", async ({ expect }) => {
    const { result } = renderHook(() => useMode());
    act(() => result.current.setMode(LIGHT));
    expect(localStorage.getItem(COOKIE_KEY)).toBe(LIGHT);
    expect(document.documentElement.getAttribute("data-m")).toBe(LIGHT);
  });

  test("Storage event", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    await act(() =>
      fireEvent(window, new StorageEvent("storage", { key: COOKIE_KEY, newValue: DARK })),
    );
    expect(hook.result.current.mode).toBe(DARK);
  });

  test("test media change event", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    await act(() => {
      // globalThis.window.media = LIGHT as ResolvedScheme;
      // @ts-expect-error -- ok
      matchMedia(MEDIA).onchange?.();
    });
    expect(hook.result.current.mode).toBe(DARK);
  });
});
