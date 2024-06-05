import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Core } from "./core";

describe.concurrent("core", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<Core className={clx} />);
		expect(screen.getByTestId("core").classList).toContain(clx);
	});
});
