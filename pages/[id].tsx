import { Button, Card, Container, Form, Input } from "@components/Atoms";
import Layout from "@components/layout/Layout";
import { cardSizeConvertor, hexToRGB } from "@libs/functions";
import useMutate from "@libs/useMutate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormInterface {
    [key: string]: string | any;
    payload: {
        [key: string]: string; // [relatedItem]: hex color code
    };
}

interface Props {
    //
}

const Search = ({}: Props) => {
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

    const [fetching, { data, loading, error }] = useMutate<FormInterface>({
        url: "/api/test", // /api/hello
        method: "POST",
    });

    const { register, handleSubmit } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { push } = useRouter();

    const onSubmit = (data: any) => {
        console.log(data);

        push(`/${data.keyword}`);
    };

    useEffect(() => {
        // console.log(id);

        if (id === undefined) return;

        fetching(id);
    }, [id]);

    useEffect(() => {
        if (data && Object.keys(data).length) {
            // console.log(data);
            // console.log(data.payload);

            // data mapping
            setState({
                ...data.payload,
            });
            // console.log(state);
        }
    }, [data]);

    return (
        <Layout
            title={(id as string) ?? "Search"}
            metaDescription={`Colors and items related on ${id}.`}
        >
            <header>
                <div className="flex justify-center items-center">
                    <div className="text-WH px-4">
                        What color do you have in mind? 🤔
                    </div>

                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        ariaLabel="form"
                        ariaRoledescription="form"
                    >
                        <Input
                            required
                            placeholder="Hi there"
                            {...register("keyword", {
                                required: "검색할 키워드를 입력해주세요.",
                            })}
                        />
                    </Form>
                </div>
            </header>

            <Container>
                {
                    Object.keys(state).map((item, index) => (
                        <Card
                            size={cardSizeConvertor(index)}
                            key={`item_${index}`}
                            style={{
                                backgroundColor: `${state[item]}`,
                            }}
                            className={
                                data?.payload
                                    ? ""
                                    : "animate-pulse bg-opacity-25"
                            }
                        >
                            {data?.payload ? (
                                <>
                                    <span className="absolute font-medium opacity-50 text-center top-1/3 bottom-0 left-0 right-0">
                                        {item}
                                    </span>
                                    <Button
                                        data-code={state[item]}
                                        className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]"
                                    >
                                        HEX
                                    </Button>
                                    <Button
                                        data-code={hexToRGB(state[item])}
                                        className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]"
                                    >
                                        RGB
                                    </Button>
                                </>
                            ) : null}
                        </Card>
                    ))
                    // : null
                }
            </Container>
        </Layout>
    );
};

export default Search;
