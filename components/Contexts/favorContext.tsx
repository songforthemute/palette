import {
    createContext,
    useCallback,
    useReducer,
    useMemo,
    useContext,
} from "react";
import type { FC, ReactNode } from "react";

interface favorStateInterface {
    poked: { [key: string]: string };
    [key: string]: any;
}

const initialState: favorStateInterface = { poked: {} };

type actionType =
    | { type: "POKE_COLOR"; item: string; code: string }
    | { type: "CLEAR_COLOR"; item: string };

export const FavorContext = createContext<favorStateInterface | any>(
    initialState
);
FavorContext.displayName = "FavorContext"; // for debugging

const favorReducer = (
    state: favorStateInterface,
    action: actionType
): favorStateInterface => {
    switch (action.type) {
        case "POKE_COLOR": {
            return {
                ...state,
                poked: { ...state.poked, [`${action.item}`]: action.code },
            };
        }

        case "CLEAR_COLOR": {
            const copy = { ...state };
            delete copy.poked[action.item]; // delete the item
            return copy;
        }
    }
};

export const FavorProvider: FC<{ children?: ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(favorReducer, initialState);

    const pokeColor = useCallback(
        (item: string, code: string) =>
            dispatch({ type: "POKE_COLOR", item, code }),
        [dispatch]
    );

    const clearColor = useCallback(
        (item: string) => dispatch({ type: "CLEAR_COLOR", item }),
        [dispatch]
    );

    const value = useMemo(
        () => ({ ...state, pokeColor, clearColor }),
        [state, pokeColor, clearColor]
    );

    return <FavorContext.Provider value={value} {...props} />;
};

interface useFavorInterface extends favorStateInterface {
    pokeColor: (item: string, code: string) => void;
    clearColor: (item: string) => void;
}

export const useFavor = () => {
    const ctx = useContext<useFavorInterface | favorStateInterface>(
        FavorContext
    );

    if (ctx === undefined) {
        console.warn("This component needs to context.");
        throw new Error("This component needs to context.");
    }

    return ctx;
};

export const ManagedFavorContext: FC<{ children?: ReactNode }> = ({
    children,
}) => {
    return <FavorProvider>{children}</FavorProvider>;
};
