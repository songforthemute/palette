// @jest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import Search from "pages/[id]";
import { ManagedFavorContext } from "@components/Contexts/favorContext";

const URL = "/apple?counts=20";

jest.mock("next/router", () => require("next-router-mock"));

describe("<Search>'s page components Unit Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Main title", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const paletteHeading = screen.getByRole("heading", {
            name: /palette/i,
        });

        expect(paletteHeading).toBeInTheDocument();
    });

    it("Id Input in Form", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const searchInput = screen.getByRole("textbox");

        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();

        await user.clear(searchInput);
        await user.type(searchInput, "chocolate");

        // input | toHaveTextContent()
        // react-hook-form | toHaveValue()
        expect(searchInput).toHaveValue("chocolate");
    });

    it("Counts Select in Form", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const countsSelect = screen.getByRole("combobox");
        expect(countsSelect).toBeInTheDocument();
        expect(countsSelect).toBeEnabled();
        expect(countsSelect).toHaveValue("10");

        await user.selectOptions(countsSelect, "8");
        expect(countsSelect).toHaveValue("8");
    });

    it("Copy Buttons in Card", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const hexCopyBtns = await screen.findAllByRole("button", {
            name: /hex/i,
        });
        const rgbCopyBtns = await screen.findAllByRole("button", {
            name: /rgb/i,
        });
        hexCopyBtns.forEach((btn) => {
            expect(btn).toBeEnabled();
            expect(btn).toBeInTheDocument();
        });
        rgbCopyBtns.forEach((btn) => {
            expect(btn).toBeEnabled();
            expect(btn).toBeInTheDocument();
        });
    });

    it("Pick Buttons in Card", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const pickBtns = await screen.findAllByRole("button", {
            name: "➕",
        });
        pickBtns.forEach((btn) => {
            expect(btn).toBeEnabled();
            expect(btn).toBeInTheDocument();
        });
    });
});

describe("<Search>'s Functional Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Hex button's Copy & Paste", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const hexCopyBtns = await screen.findAllByRole("button", {
            name: /hex/i,
        });
        const hexCopyBtn = hexCopyBtns[0];
        expect(hexCopyBtn).toBeEnabled();

        await user.click(hexCopyBtn);

        const searchInput = screen.getByRole("textbox");
        await user.clear(searchInput);
        await user.click(searchInput);
        await user.paste();

        expect(searchInput).toHaveValue("#FFFFFF30");
    });

    it("Rgb button's Copy & Paste", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const hexCopyBtns = await screen.findAllByRole("button", {
            name: /rgb/i,
        });
        const hexCopyBtn = hexCopyBtns[0];
        expect(hexCopyBtn).toBeEnabled();

        await user.click(hexCopyBtn);

        const searchInput = screen.getByRole("textbox");
        await user.clear(searchInput);
        await user.click(searchInput);
        await user.paste();

        expect(searchInput).toHaveValue("255, 255, 255");
    });

    it("Fold & Unfold Palette", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const palette = screen.getByRole("button", { name: /your palette/i });
        expect(palette).toBeEnabled();

        await waitFor(async () => {
            await user.click(palette);
            // expect(palette).toHaveTextContent("Open Palette");
        });
    });
});

describe("<Search>'s Context Test", () => {
    window.scrollTo = jest.fn(); // avoid 'Not implemented: window'

    const user = userEvent.setup();

    it("Pick any color by card", async () => {
        await mockRouter.push(URL);

        render(<Search />, { wrapper: ManagedFavorContext });

        const pickBtns = await screen.findAllByRole("button", {
            name: "➕",
        });
        const pickBtn = pickBtns[0];
        await user.click(pickBtn);

        const pickedCard = screen.getByTestId("#FFFFFF30");
        expect(pickedCard).toBeInTheDocument();
    });

    it("Pick any color by card after palette container", async () => {
        await mockRouter.push(URL);

        render(<Search />, { wrapper: ManagedFavorContext });

        const pickBtns = await screen.findAllByRole("button", {
            name: "➕",
        });
        const pickBtn = pickBtns[0];
        await user.click(pickBtn);

        const pickedCard = screen.getByTestId("#FFFFFF30");
        expect(pickedCard).toBeInTheDocument();
        expect(pickedCard).toBeVisible();
    });
});
