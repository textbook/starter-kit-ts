beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.findByTestId("message").should("contain.text", "Hello, world!");
});
