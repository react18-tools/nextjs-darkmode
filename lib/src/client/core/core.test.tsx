import { act, cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { Core, noFOUCScript } from "./core";
import { useMode } from "../../hooks";
import { DARK, LIGHT } from "../../constants";

const STORAGE_KEY = "o";
describe("theme-switcher", () => {
  afterEach(cleanup);

  beforeEach(() => {
    noFOUCScript(STORAGE_KEY);
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
    expect(localStorage.getItem(STORAGE_KEY)).toBe(LIGHT);
    expect(document.documentElement.getAttribute("data-m")).toBe(LIGHT);
  });

  test("Storage event", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    await act(() =>
      fireEvent(window, new StorageEvent("storage", { key: STORAGE_KEY, newValue: DARK })),
    );
    expect(hook.result.current.mode).toBe(DARK);
  });

  test("test media change event", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    await act(() => {
      // globalThis.window.media = LIGHT as ResolvedScheme;
      // @ts-expect-error -- ok
      m.onchange?.();
    });
    expect(hook.result.current.mode).toBe(DARK);
  });
});
