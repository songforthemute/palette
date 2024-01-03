import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useFavor } from "@components/Contexts/favorContext";
import {
    Button,
    Container,
    SearchForm,
    Layout,
    SearchResult,
    HorizonLine,
    PokedCards,
} from "components";
import {
    getInitialResult,
    useClear,
    useCopy,
    useMutate,
    usePoke,
    useToggleFold,
} from "libs";
import store from "@components/Contexts/sessionStorage";

interface ResponseInterface {
    [key: string]: string; // [relatedItem]: hex color code
}

interface FetchInterface {
    [key: string]: string | any;
    response: ResponseInterface;
    error?: string;
}

const Search = () => {
    const [result, setResult] = useState<ResponseInterface>(getInitialResult());

    const {
        push,
        query: { id, counts },
    } = useRouter();

    const [fetching, { data, loading }] = useMutate<FetchInterface>({
        url: `/api/${id as string}?counts=${counts}`,
        method: "POST",
    });

    const onSubmit = ({ id, counts }: { id: string; counts: string }) => {
        push(`/${id}?counts=${counts}`);
    };

    // The context that are of poked colors
    const { poked } = useFavor();

    // Poked color tab ref
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle fold/unfold poked color tab
    const { onClickToggleFold } = useToggleFold<HTMLDivElement>(containerRef);
    const { onClickCopy } = useCopy<ResponseInterface>(setResult); // Press hex/rgb button
    const { onClickPoke } = usePoke(); // poke the color
    const { onClickClear } = useClear(); // delete poked color

    // initialize for fetching
    useEffect(() => {
        setResult(getInitialResult());

        // check for previous fetching result
        if (id !== undefined) {
            const query = store.get(id as string);
            if (query) setResult({ ...query });
            else fetching(id);
        }
    }, [id, setResult]);

    // data mapping
    useEffect(() => {
        if (data?.response && !loading) {
            setResult({
                ...data.response,
            });
            store.set(id as string, data.response);
        }
    }, [data]);

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
                <PokedCards
                    data={poked}
                    onClickClear={onClickClear}
                    onClickCopy={onClickCopy}
                />
            </Container>

            <HorizonLine />

            <Container>
                <SearchResult
                    data={result}
                    loading={loading}
                    onClickCopy={onClickCopy}
                    onClickPoke={onClickPoke}
                />
            </Container>
        </Layout>
    );
};

export default Search;
