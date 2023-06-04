import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useFavor } from "@components/Contexts/favorContext";
import { Button, Card, Container, SearchForm, Layout } from "components";
import {
    cardSizeConvertor,
    cls,
    convertColorType,
    initialResult,
    useMutate,
} from "libs";

import store from "@components/Contexts/sessionStorage";

interface FetchInterface {
    [key: string]: string | any;
    payload: {
        [key: string]: string; // [relatedItem]: hex color code
    };
    error?: string;
}

type colorType = "HEX" | "RGB";

const Search = () => {
    const [result, setResult] = useState<{ [key: string]: string }>(
        initialResult()
    );

    const {
        query: { id, counts },
    } = useRouter();

    const [fetching, { data, loading }] = useMutate<FetchInterface>({
        url: `/api/${id as string}?counts=${counts}`,
        method: "POST",
    });

    const { push } = useRouter();
    const onSubmit = ({ id, counts }: { id: string; counts: string }) => {
        push(`/${id}?counts=${counts}`);
    };

    // The context that are of poked colors
    const { poked, clearColor, pokeColor } = useFavor();

    // Poked color tab ref
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle fold/unfold poked color tab
    const onClickToggleFold = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const {
                style: { maxHeight },
            } = containerRef.current as HTMLDivElement;

            // Fold poked color tab
            if (!maxHeight || maxHeight !== "0px") {
                containerRef.current!.style.maxHeight = "0px";
                e.currentTarget.innerText = "Open Palette";
            }
            // Unfold poked color tab
            else {
                containerRef.current!.style.maxHeight = "1024px"; // how much?
                e.currentTarget.innerText = "Close Palette";
            }
        },
        [containerRef]
    );

    // Press hex/rgb button
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
        setResult((prev) => ({
            ...prev,
            [item as string]: "Copied!",
        }));

        // Return to original state
        setTimeout(() => {
            // (e.target as HTMLButtonElement).innerText = innerText; // Do not Manipulate directly
            setResult((prev) => ({
                ...prev,
                [item as string]: convertColorType(
                    code as string,
                    innerText as colorType
                ),
            }));
        }, 1500);
    }, []);

    // poke the color
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

    // delete poked color
    const onClickClear = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const {
                dataset: { item },
            } = e.currentTarget;

            clearColor(`${item}`);
        },
        [clearColor]
    );

    // initialize for fetching
    useEffect(() => {
        setResult(initialResult());

        // check for previous fetching result
        if (id !== undefined) {
            const query = store.get(id as string);

            if (query) setResult({ ...query });
            else fetching(id);
        }
    }, [id, setResult]);

    // data mapping
    useEffect(() => {
        if (data?.payload && !loading) {
            setResult({
                ...data.payload,
            });
            store.set(id as string, data.payload);
        }
    }, [data, setResult]);

    return (
        <Layout
            title={(id as string) ?? "Search"}
            metaDescription={`Colors and items related on ${id}.`}
        >
            <header className="flex flex-col md:flex-row w-full justify-start md:justify-center items-start md:items-center  mx-auto">
                <h1 className="text-WH text-center drop-shadow-md text-2xl md:text-4xl my-2.5 mx-4">
                    Palette 🎨
                </h1>

                <SearchForm
                    placeholder="Hi there :D"
                    className="w-full md:max-w-[50%]"
                    onSubmit={onSubmit}
                    defaultValue={id as string}
                />
            </header>

            <div className="md:mx-[15%] px-2 mt-4">
                <Button
                    onClick={onClickToggleFold}
                    className="py-1 md:py-2 px-2 font-medium text-BK text-opacity-100"
                >
                    Your Palette 🎨
                </Button>
            </div>

            <Container ref={containerRef} className="overflow-hidden">
                {Object.entries(poked)?.map(([item, code], index) => (
                    <Card
                        size={"first"}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${code}`,
                        }}
                        className={cls(
                            "relative transition duration-500 ease-in-out max-h-36"
                        )}
                    >
                        <div className="absolute flex flex-col font-medium opacity-50 text-center top-[30%] inset-x-0 text-sm space-y-1">
                            <span className="mx-2">{item}</span>
                            <span>{code}</span>
                        </div>
                        <Button
                            data-item={item}
                            data-code={code}
                            onClick={onClickCopy}
                            className="absolute items-center justify-center text-center bottom-3 left-3 p-2.5 text-xs leading-[0.25rem]"
                        >
                            HEX
                        </Button>
                        <Button
                            data-item={item}
                            data-code={convertColorType(code, "RGB")}
                            onClick={onClickCopy}
                            className="absolute text-center bottom-3 left-16 p-2.5 text-xs leading-[0.25rem]"
                        >
                            RGB
                        </Button>
                        <Button
                            data-item={item}
                            data-code={code}
                            onClick={onClickClear}
                            className="absolute text-center top-3 right-3 aspect-square p-1 rounded-full text-xs leading-[0.25rem]"
                        >
                            ✖️
                        </Button>
                    </Card>
                ))}
            </Container>

            <hr className="border-[0.1rem] rounded-full opacity-30 mt-4" />

            <Container>
                {Object.entries(result).map(([item, code], index) => (
                    <Card
                        size={cardSizeConvertor(index)}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${code}`,
                        }}
                        className={cls(
                            "relative transition duration-500 ease-in-out",
                            loading ? "animate-pulse opacity-10" : ""
                        )}
                    >
                        {loading ? null : (
                            <>
                                <div className="absolute flex flex-col font-medium opacity-50 text-center top-[30%] space-y-1 inset-x-0 text-sm">
                                    <span className="text-center mx-2">
                                        {item}
                                    </span>
                                    <span className="text-center">{code}</span>
                                </div>
                                <Button
                                    data-item={item}
                                    data-code={code}
                                    onClick={onClickCopy}
                                    className="absolute items-center justify-center text-center bottom-3 left-3 p-2.5 text-xs leading-[0.25rem]"
                                >
                                    HEX
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={convertColorType(code, "RGB")}
                                    onClick={onClickCopy}
                                    className="absolute text-center bottom-3 left-16 p-2.5 text-xs leading-[0.25rem]"
                                >
                                    RGB
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={code}
                                    onClick={onClickPoke}
                                    className="absolute text-center flex justify-center items-center top-3 right-3 aspect-square p-1 rounded-full text-xs leading-[0.25rem]"
                                >
                                    ➕
                                </Button>
                            </>
                        )}
                    </Card>
                ))}
            </Container>
        </Layout>
    );
};

export default Search;
