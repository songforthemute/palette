import { Button, Card, Container, Form, Input } from "@components/Atoms";
import { useFavor } from "@components/Contexts/favorContext";
import Layout from "@components/layout/Layout";
import { cardSizeConvertor, cls, convertColorType } from "@libs/functions";
import useMutate from "@libs/useMutate";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FetchInterface {
    [key: string]: string | any;
    payload: {
        [key: string]: string; // [relatedItem]: hex color code
    };
}

type colorType = "HEX" | "RGB";

interface FormInterface {
    id: string;
}

const Search = () => {
    const [state, setState] = useState<{ [key: string]: string }>({
        "0": "#FFF",
        "1": "#FFF",
        "2": "#FFF",
        "3": "#FFF",
        "4": "#FFF",
        "5": "#FFF",
        "6": "#FFF",
        "7": "#FFF",
        "8": "#FFF",
        "9": "#FFF",
        "10": "#FFF",
        "11": "#FFF",
        "12": "#FFF",
        "13": "#FFF",
        "14": "#FFF",
        "15": "#FFF",
        "16": "#FFF",
        "17": "#FFF",
        "18": "#FFF",
        "19": "#FFF",
        "20": "#FFF",
        "21": "#FFF",
        "22": "#FFF",
        "23": "#FFF",
        "24": "#FFF",
        "25": "#FFF",
        "26": "#FFF",
        "27": "#FFF",
        "28": "#FFF",
        "29": "#FFF",
    });

    const {
        query: { id },
    } = useRouter();

    const [fetching, { data }] = useMutate<FetchInterface>({
        url: "/api/test",
        method: "POST",
    });

    const { register, handleSubmit, setValue } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { push } = useRouter();

    const onSubmit = (data: any) => {
        push(`/${data.id}`);
    };

    const { poked, clearColor, pokeColor } = useFavor();

    // press hex/rgb button
    const onClickCopy = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { code, item },
            innerText,
        } = e.currentTarget;

        // global state change: copy color code
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(code as string);
        }

        // e.currentTarget.innerText = "Copied!"; // No Manipulate directly

        // display 'copied!' message
        setState((prev) => ({
            ...prev,
            [item as string]: "Copied!",
        }));

        setTimeout(() => {
            // (e.target as HTMLButtonElement).innerText = innerText; // No Manipulate directly

            // return to original state
            setState((prev) => ({
                ...prev,
                [item as string]: convertColorType(
                    code as string,
                    innerText as colorType
                ),
            }));
        }, 1500);
    }, []);

    // press poke!
    const onClickPoke = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { code, item },
        } = e.currentTarget;

        pokeColor(`${item}`, convertColorType(`${code}`, "HEX"));
    }, []);

    const onClickClear = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const {
            dataset: { item },
        } = e.currentTarget;

        clearColor(`${item}`);
    }, []);

    // initialize
    useEffect(() => {
        if (id !== undefined) {
            setValue("id", id as string);
            fetching(id);
        }
    }, [id]);

    // data mapping
    useEffect(() => {
        if (data && Object.keys(data).length) {
            setState({
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

                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        ariaLabel="form"
                        ariaRoledescription="form"
                        className="w-full max-w-[50%]"
                    >
                        <Input
                            required
                            placeholder="Hi there"
                            {...register("id", {
                                required: "검색할 키워드를 입력해주세요.",
                            })}
                        />
                    </Form>
                </div>
            </header>

            <Container>
                {Object.keys(poked ?? {})?.map((item, index) => (
                    <Card
                        size={"first"}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${poked[item]}`,
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
                                        {poked[item]}
                                    </span>
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
                                    data-code={convertColorType(
                                        poked[item],
                                        "RGB"
                                    )}
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
                            </>
                        ) : null}
                    </Card>
                ))}
            </Container>

            <hr className="border-[0.1rem] rounded-full opacity-30 mt-4" />

            <Container>
                {Object.keys(state).map((item, index) => (
                    <Card
                        size={cardSizeConvertor(index)}
                        key={`item_${index}`}
                        style={{
                            backgroundColor: `${state[item]}`,
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
                                        {state[item]}
                                    </span>
                                </div>
                                <Button
                                    data-item={item}
                                    data-code={state[item]}
                                    onClick={onClickCopy}
                                    className="absolute items-center justify-center text-center bottom-3 left-3 p-2.5 text-xs leading-[0.25rem]"
                                >
                                    HEX
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={convertColorType(
                                        state[item],
                                        "RGB"
                                    )}
                                    onClick={onClickCopy}
                                    className="absolute text-center bottom-3 left-[4rem] p-2.5 text-xs leading-[0.25rem]"
                                >
                                    RGB
                                </Button>
                                <Button
                                    data-item={item}
                                    data-code={state[item]}
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
