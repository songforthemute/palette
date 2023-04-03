import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useFavor } from "@components/Contexts/favorContext";
import { Button, Card, Container, SearchForm, Layout } from "../components";
import {
    cardSizeConvertor,
    cls,
    convertColorType,
    initialResult,
    useMutate,
} from "../libs";

interface FetchInterface {
    [key: string]: string | any;
    payload: {
        [key: string]: string; // [relatedItem]: hex color code
    };
}

type colorType = "HEX" | "RGB";

const Search = () => {
    const [result, setResult] = useState<{ [key: string]: string }>(
        initialResult
    );

    const {
        query: { id },
    } = useRouter();

    const [fetching, { data }] = useMutate<FetchInterface>({
        url: "/api/test",
        method: "POST",
    });

    const { push } = useRouter();
    const onSubmit = (data: any) => {
        push(`/${data.id}`);
    };

    // The context that are of poked colors
    const { poked, clearColor, pokeColor } = useFavor();

    // Poked color tab ref
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle fold/unfold poked color tab
    const onClickToggleFold = useCallback(() => {
        const {
            style: { maxHeight },
        } = containerRef.current as HTMLDivElement;

        // Fold poked color tab
        if (!maxHeight || maxHeight !== "0px") {
            containerRef.current!.style.maxHeight = "0px";
            // containerRef.current!.style.opacity = "0.2";
        }
        // Unfold poked color tab
        else {
            containerRef.current!.style.maxHeight = "2048px"; // how much?
            // containerRef.current!.style.opacity = "1";
        }
    }, [containerRef]);

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
    const onClickPoke = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { code, item },
        } = e.currentTarget;

        // behavior after 'Copied!' message is displayed
        if (code === "Copied!") return;

        pokeColor(`${item}`, convertColorType(`${code}`, "HEX"));
    }, []);

    // delete poked color
    const onClickClear = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { item },
        } = e.currentTarget;

        clearColor(`${item}`);
    }, []);

    // initialize for fetching
    useEffect(() => {
        if (id !== undefined) {
            // setValue("id", id as string);
            fetching(id);
        }
    }, [id]);

    // data mapping
    useEffect(() => {
        if (data && Object.keys(data).length) {
            setResult({
                ...data.payload,
            });
        }
    }, [data]);

    return (
        <Layout
            title={(id as string) ?? "Search"}
            metaDescription={`Colors and items related on ${id}.`}
        >
            <header>
                <div className="flex w-full justify-center items-center">
                    <h1 className="text-WH text-center drop-shadow-md text-3xl md:text-4xl mx-4">
                        Palette 🎨
                    </h1>

                    <SearchForm
                        placeholder="Hi there :D"
                        className="w-full max-w-[50%]"
                        onSubmit={onSubmit}
                        defaultValue={id as string}
                    />
                </div>
            </header>

            <div className="px-40 pt-4 space-x-4">
                <Button
                    onClick={onClickToggleFold}
                    className="px-2 py-2 font-medium text-BK text-opacity-100"
                >
                    Your Palette 🎨
                </Button>
            </div>

            <Container ref={containerRef} className="overflow-hidden">
                {Object.keys(poked)?.map((item, index) => (
                    <Card
                        size={"first"}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${poked[item]}`,
                        }}
                        className={cls(
                            "relative transition duration-500 ease-in-out max-h-36"
                        )}
                    >
                        <div className="absolute flex flex-col font-medium opacity-50 text-center top-1/3 bottom-0 left-0 right-0">
                            <span className="text-center">{item}</span>
                            <span className="text-center">{poked[item]}</span>
                        </div>
                        <Button
                            data-item={item}
                            data-code={poked[item]}
                            onClick={onClickCopy}
                            className="absolute items-center justify-center text-center bottom-3 left-3 p-2.5 text-xs leading-[0.25rem]"
                        >
                            HEX
                        </Button>
                        <Button
                            data-item={item}
                            data-code={convertColorType(poked[item], "RGB")}
                            onClick={onClickCopy}
                            className="absolute text-center bottom-3 left-[4rem] p-2.5 text-xs leading-[0.25rem]"
                        >
                            RGB
                        </Button>
                        <Button
                            data-item={item}
                            data-code={poked[item]}
                            onClick={onClickClear}
                            className="absolute text-center top-3 right-[0.75rem] aspect-square p-1 rounded-full text-xs leading-[0.25rem]"
                        >
                            ✖️
                        </Button>
                    </Card>
                ))}
            </Container>
            <hr className="border-[0.1rem] rounded-full opacity-30 mt-4" />

            <Container>
                {Object.keys(result).map((item, index) => (
                    <Card
                        size={cardSizeConvertor(index)}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${result[item]}`,
                        }}
                        className={cls(
                            "relative transition duration-500 ease-in-out",
                            data?.payload ? "" : "animate-pulse opacity-10"
                        )}
                    >
                        {data?.payload ? (
                            <>
                                <div className="absolute flex flex-col font-medium opacity-50 text-center top-1/3 bottom-0 left-0 right-0">
                                    <span className="text-center">{item}</span>
                                    <span className="text-center">
                                        {result[item]}
                                    </span>
                                </div>
                                <Button
                                    data-item={item}
                                    data-code={result[item]}
                                    onClick={onClickCopy}
                                    className="absolute items-center justify-center text-center bottom-3 left-3 p-2.5 text-xs leading-[0.25rem]"
                                >
                                    HEX
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={convertColorType(
                                        result[item],
                                        "RGB"
                                    )}
                                    onClick={onClickCopy}
                                    className="absolute text-center bottom-3 left-[4rem] p-2.5 text-xs leading-[0.25rem]"
                                >
                                    RGB
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={result[item]}
                                    onClick={onClickPoke}
                                    className="absolute text-center top-3 right-[0.75rem] aspect-square p-1 rounded-full text-xs leading-[0.25rem]"
                                >
                                    ➕
                                </Button>
                            </>
                        ) : null}
                    </Card>
                ))}
            </Container>
        </Layout>
    );
};

export default Search;
