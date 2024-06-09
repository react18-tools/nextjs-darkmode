import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerTarget } from "./server-target";
import { COOKIE_KEY, DARK, LIGHT } from "../../constants";
import { ResolvedScheme } from "../../utils";

describe("server-target", () => {
  afterEach(cleanup);

  test("default render", ({ expect }) => {
    globalThis.cookies = {};
    render(<ServerTarget />);
    expect(screen.getByTestId("server-target").className).toBe(LIGHT);
  });

  test("test class from cookies", ({ expect }) => {
    const MODE = DARK as ResolvedScheme;
    globalThis.cookies = {
      [COOKIE_KEY]: { value: MODE },
    };
    render(<ServerTarget />);
    expect(screen.getByTestId("server-target").className).toBe(MODE);
  });
});
