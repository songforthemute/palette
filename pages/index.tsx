import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout, Container, SearchForm, ExampleCards } from "../components";
import { cls } from "../libs";

const Home = () => {
    const { push } = useRouter();
    const onSubmit = ({ id, counts }: { id: string; counts: string }) => {
        setSearching(true);
        setTimeout(async () => {
            await push(`/${id}/?counts=${counts}`);
        }, 1100);
    };

    const [searching, setSearching] = useState(false);

    // Scroll Lock
    useEffect(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            // Get the current scroll position
            const { scrollY } = window;

            // Set the body to position fixed and top to negative value of the scroll position
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.top = `-${scrollY}px`;
        }

        // Re-enable scrolling when the component unmounts
        return () => {
            if (
                typeof window !== "undefined" &&
                typeof document !== "undefined"
            ) {
                document.body.style.position = "";
                document.body.style.top = "";
                window?.scrollTo(0, scrollY);
            }
        };
    }, []);

    return (
        <Layout
            title="Home"
            metaDescription="Palette Home page. Type the word and get colors."
        >
            <div
                className={cls(
                    `my-10 w-full mx-auto flex flex-col justify-center items-center transition duration-[750ms] ease-in`,
                    searching ? "-translate-y-96 opacity-0" : ""
                )}
            >
                <div className={`text-center`}>
                    <h1 className="text-WH drop-shadow-md text-6xl md:text-8xl px-4">
                        Palette
                    </h1>
                    <h5 className="mt-4 mb-12 text-WH px-4">
                        What you imagined, its color 🎨
                    </h5>
                </div>

                <SearchForm
                    placeholder="What do you have in mind? 🤔"
                    className={cls(
                        "w-4/5 transition duration-[750ms] ease-in",
                        searching ? "opacity-0" : ""
                    )}
                    onSubmit={onSubmit}
                />
            </div>

            <Container
                className={cls(
                    "overflow-y-hidden relative -bottom-4 transition duration-1000 ease-in",
                    searching ? "translate-y-3/4 opacity-0" : ""
                )}
            >
                <ExampleCards />
            </Container>
        </Layout>
    );
};

export default Home;
