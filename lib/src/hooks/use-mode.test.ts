import { cleanup, renderHook, act } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useMode } from "./use-mode";
import { LIGHT } from "../constants";

describe.concurrent("useTheme", () => {
  afterEach(cleanup);

  test("Test setting mode", ({ expect }) => {
    const { result } = renderHook(() => useMode());
    act(() => result.current.setMode(LIGHT));
    expect(result.current.mode).toBe(LIGHT);
  });
});
