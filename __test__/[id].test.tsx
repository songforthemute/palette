// @jest-environment jsdom
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import Search from "pages/[id]";
import {
    ManagedFavorContext,
    useFavor,
} from "@components/Contexts/favorContext";
import { PokedCards, SearchResult } from "@components/Organisms";

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

    it("Submit button in Form", async () => {
        await mockRouter.push(URL);

        render(<Search />);

        const searchInput = screen.getByRole("textbox");
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();

        const submitButton = screen.getByRole("button", { name: "→" });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();

        await user.clear(searchInput);
        await user.type(searchInput, "chocolate");

        // input | toHaveTextContent()
        // react-hook-form | toHaveValue()
        expect(searchInput).toHaveValue("chocolate");
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
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

    it("SearchResult cards rendering", async () => {
        await mockRouter.push(URL);

        const data = {
            "Apple Red": "FF0000",
        };

        render(
            <SearchResult
                loading={false}
                data={data}
                onClickPoke={jest.mock}
                onClickCopy={jest.mock}
            />
        );

        const redAppleCard = await screen.findByText(/apple red/i);
        expect(redAppleCard).toBeInTheDocument();
        expect(redAppleCard).toBeVisible();

        const hexCopyBtn = await screen.findByRole("button", { name: /hex/i });
        expect(hexCopyBtn).toBeInTheDocument();
        expect(hexCopyBtn).toBeEnabled();
    });

    it("Poked cards rendering", async () => {
        await mockRouter.push(URL);

        const data = {
            "Apple Red": "FF0000",
        };

        render(
            <PokedCards
                data={data}
                onClickClear={jest.mock}
                onClickCopy={jest.mock}
            />
        );

        const redAppleCard = screen.getByTestId(/ff0000/i);
        expect(redAppleCard).toBeInTheDocument();
        expect(redAppleCard).toHaveTextContent(/ff0000/i);

        const hexCopyBtn = screen.getByRole("button", { name: /hex/i });
        expect(hexCopyBtn).toBeInTheDocument();
        expect(hexCopyBtn).toBeEnabled();
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

        await user.click(palette);

        // await waitFor(async () => {
        //     expect(palette).toHaveTextContent(/open palette/i);
        // });
    });

    it("Type in the input & Submit the form", async () => {
        await mockRouter.push(URL);

        render(<Search />);

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

        const submitButton = screen.getByRole("button", { name: "→" });
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

    it("Poked Context initial", async () => {
        const { result } = renderHook((initialProps: any) => useFavor());

        expect(result.current?.poked).toEqual({});
    });
});
