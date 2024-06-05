import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Core } from "./core";

describe.concurrent("core", () => {
  afterEach(cleanup);

  test("test if renders without errors", ({ expect }) => {
    render(<Core />);
  });
});
