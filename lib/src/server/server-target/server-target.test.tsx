import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerTarget } from "./server-target";

describe.concurrent("server-target", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<ServerTarget className={clx} />);
		expect(screen.getByTestId("server-target").classList).toContain(clx);
	});
});
