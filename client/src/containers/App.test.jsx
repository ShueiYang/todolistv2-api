import { render, screen } from "@testing-library/react";
import App from "./App"

// mini display test on the client side

describe("App", () => {

    it("Display the current date", () => {
        render(<App />);
        const today = new Date();
        const expectDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            day : "numeric",
            month: "long",
            year: "numeric"
        });
        expect(screen.getByText(expectDate)).toBeInTheDocument();
    })
})
