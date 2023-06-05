// @jest-environment jsdom
import React from "react";
import { act, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import Home from "./index";
import { ExampleCards, SearchForm } from "@components/Organisms";
import { Button } from "@components/Atoms";

jest.mock("next/router", () => require("next-router-mock"));

describe("<Home>'s Components Unit Test", () => {
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

        render(<SearchForm onSubmit={jest.mock} />);

        const searchInput = screen.getByRole("textbox");

        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();

        await user.clear(searchInput);
        await user.type(searchInput, "kakao");

        // input | toHaveTextContent()
        // react-hook-form | toHaveValue()
        expect(searchInput).toHaveValue("kakao");
    });

    it("Counts select in Form & Select other value", async () => {
        await mockRouter.push("/");

        render(<Home />);

        const countsSelect = screen.getByRole("combobox");
        expect(countsSelect).toBeInTheDocument();
        expect(countsSelect).toBeEnabled();
        expect(countsSelect).toHaveValue("10");

        await user.selectOptions(countsSelect, "12");
        expect(countsSelect).toHaveValue("12");
    });

    it("Cards in <Home>", async () => {
        await mockRouter.push("/");

        render(<ExampleCards />);

        const cards = screen.getAllByTestId(/\#[a-zA-Z0-9]/i);

        cards.map((card) => {
            expect(card).toBeInTheDocument();
            expect(card).toHaveAttribute("data-testid");
            expect(card).toHaveAttribute("style");
        });
    });
});

describe("<Home>'s Components Functionnal Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Type in the input & Submit the form", async () => {
        await mockRouter.push("/");
        render(<Home />);

        const form = screen.getByRole("form");
        const searchInput = screen.getByRole("textbox");
        const countsSelect = screen.getByRole("combobox");

        await user.clear(searchInput);
        await user.type(searchInput, "kakao");
        await user.selectOptions(countsSelect, "12");

        expect(form).toHaveFormValues({
            id: "kakao",
            counts: "12",
        });

        const submitButton = document?.createElement("button");
        form.appendChild(submitButton);

        await user.click(submitButton);

        act(() => {
            jest.useFakeTimers();
            jest.advanceTimersByTime(1100);
            expect(form).toHaveClass("opacity-0");
        });

        // How to define the situation when submitted the form?
    });
});
