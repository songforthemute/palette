import {
    Dispatch,
    MouseEvent,
    RefObject,
    SetStateAction,
    useCallback,
} from "react";
import { convertColorType } from "./utils";
import { useFavor } from "@components/Contexts/favorContext";

export const useToggleFold = <T extends HTMLElement>(
    ref: RefObject<T | HTMLDivElement>
) => {
    const onClickToggleFold = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const {
                style: { maxHeight },
            } = ref.current as T;

            // Fold poked color tab
            if (!maxHeight || maxHeight !== "0px") {
                ref.current!.style.maxHeight = "0px";
                e.currentTarget.innerText = "Open Palette";
            }
            // Unfold poked color tab
            else {
                ref.current!.style.maxHeight = "1024px"; // how much?
                e.currentTarget.innerText = "Close Palette";
            }
        },
        [ref]
    );

    return { onClickToggleFold };
};

type colorType = "HEX" | "RGB";

export const useCopy = <T extends {}>(
    setState: Dispatch<SetStateAction<T>>
) => {
    const onClickCopy = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { code, item },
            innerText,
        } = e.currentTarget;

        if (code === "Copied!") return;

        // Global state change: copy color code
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(code as string);
        }

        // Show 'Copied!' message
        // e.currentTarget.innerText = "Copied!"; // Do not Manipulate directly
        setState((prev) => ({
            ...prev,
            [item as string]: "Copied!",
        }));

        // Return to original state
        setTimeout(() => {
            // (e.target as HTMLButtonElement).innerText = innerText; // Do not Manipulate directly
            setState((prev) => ({
                ...prev,
                [item as string]: convertColorType(
                    code as string,
                    innerText as colorType
                ),
            }));
        }, 1500);
    }, []);

    return { onClickCopy };
};

export const usePoke = () => {
    const { pokeColor } = useFavor();

    const onClickPoke = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const {
                dataset: { code, item },
            } = e.currentTarget;

            // behavior after 'Copied!' message is displayed
            if (code === "Copied!") return;

            pokeColor(`${item}`, convertColorType(`${code}`, "HEX"));
        },
        [pokeColor]
    );

    return { onClickPoke };
};

export const useClear = () => {
    const { clearColor } = useFavor();

    const onClickClear = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const {
                dataset: { item },
            } = e.currentTarget;

            clearColor(`${item}`);
        },
        [clearColor]
    );

    return { onClickClear };
};
