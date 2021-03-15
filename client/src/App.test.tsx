import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";
import logo from "./logo.svg";

const message = "Foo bar!";
const server = setupServer(
	rest.get("/api", (_, res, ctx) => {
		return res(ctx.status(200), ctx.json({ message }));
	}),
);

describe("App", () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("shows a loading state", async () => {
		render(<App />);

		expect(screen.getByTestId("message")).toHaveTextContent("Loading...");
	});

	it("shows an image", async () => {
		render(<App />);
		const element = screen.getByTestId("logo");
		expect(element).toHaveAttribute("alt", "Just the React logo");
		expect(element).toHaveAttribute("src", logo);
	});

	it("shows the message when the request resolves", async () => {
		render(<App />);
		await expect(screen.findByText(message)).resolves.toBeInTheDocument();
	});
});
