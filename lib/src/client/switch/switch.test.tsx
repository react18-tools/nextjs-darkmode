import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Switch } from "./switch";

describe.concurrent("switch", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<Switch className={clx} />);
		expect(screen.getByTestId("switch").classList).toContain(clx);
	});
});
