import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("<Home>'s page components Unit Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Main title & Subtitle", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const paletteHeading = screen.getByRole("heading", {
            name: /palette/i,
        });

        const subtitleHeading = screen.getByRole("heading", {
            name: /what you imagined, its color/i,
        });

        expect(paletteHeading).toBeInTheDocument();
        expect(subtitleHeading).toBeInTheDocument();
    });

    it("Search input in Form & Type anything", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const searchInput = screen.getByRole("textbox");

        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();

        await user.clear(searchInput);
        await user.type(searchInput, "kakao");

        // input | toHaveTextContent()
        // react-hook-form | toHaveValue()
        expect(searchInput).toHaveValue("kakao");
    });

    it("Submit button in Form & isEnable", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const searchInput = screen.getByRole("textbox");

        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();

        await user.clear(searchInput);
        await user.type(searchInput, "kakao");

        // input | toHaveTextContent()
        // react-hook-form | toHaveValue()
        expect(searchInput).toHaveValue("kakao");

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    it("Counts select in Form & Select other value", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const count = "12";
        const countsSelect = screen.getByRole("combobox");
        expect(countsSelect).toBeInTheDocument();
        expect(countsSelect).toBeEnabled();
        expect(countsSelect).toHaveValue(count);

        await user.selectOptions(countsSelect, count);
        expect(countsSelect).toHaveValue(count);
    });

    it("Cards in <Home>", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const cards = screen.getAllByTestId(/\#[a-zA-Z0-9]/i);

        cards.map((card) => {
            expect(card).toBeInTheDocument();
            expect(card).toHaveAttribute("data-testid");
            expect(card).toHaveAttribute("style");
        });
    });
});

describe("<Home>'s Form Functionnal Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Type in the input & Submit the form", async () => {
        await mockRouter.push("/");
        render(<Home />);

        const count = "12";
        const form = screen.getByRole("form");
        const searchInput = screen.getByRole("textbox");
        const countsSelect = screen.getByRole("combobox");

        await user.clear(searchInput);
        await user.type(searchInput, "kakao");
        await user.selectOptions(countsSelect, count);

        expect(form).toHaveFormValues({
            id: "kakao",
            counts: count,
        });

        const submitButton = screen.getByRole("button");
        await user.click(submitButton);

        await waitFor(() => {
            new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                expect(window?.location).toEqual(
                    "http://localhost:3000/kakao?counts=12"
                );
            });
        });

        // How to define the situation when submitted the form?
    });
});
