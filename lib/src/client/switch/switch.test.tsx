import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useMode } from "../../hooks";
import { Switch } from "./switch";
import { DARK, LIGHT, SYSTEM } from "../../constants";

describe("switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    render(<Switch />);
    const element = screen.getByTestId("switch");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(DARK);
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(LIGHT);
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(SYSTEM);
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(DARK);
  });

  test("color-scheme-toggle with skip system", async ({ expect }) => {
    const hook = renderHook(() => useMode());
    act(() => {
      hook.result.current.setMode(SYSTEM);
    });
    render(<Switch skipSystem>Switch with children</Switch>);
    const element = screen.getByTestId("switch");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(DARK);
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(LIGHT);
    await act(() => fireEvent.click(element));
    expect(hook.result.current.mode).toBe(DARK);
  });
});
