import { Card, Container, Form, Input } from "@components/Atoms";
import Layout from "@components/layout";
import { cls } from "@libs/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormInterface {
    id: string;
}

const Home = () => {
    const { register, handleSubmit } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { push } = useRouter();
    const onSubmit = (data: any) => {
        setSearching(true);
        setTimeout(async () => {
            await push(`/${data.id}`);
        }, 1250);
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

            // Re-enable scrolling when the component unmounts
            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, []);

    return (
        <Layout
            title="Home"
            metaDescription="Palette Home page. Type the word and get colors."
        >
            <div
                className={cls(
                    `my-10 w-full mx-auto flex flex-col justify-center items-center transition duration-1000 ease-in`,
                    searching ? "-translate-y-96" : ""
                )}
            >
                <div className={`text-center`}>
                    <h1 className="text-WH drop-shadow-md text-6xl md:text-8xl px-4">
                        Palette
                    </h1>
                    <h5 className="mt-4 mb-12 text-WH px-4">
                        What color do you have in mind? 🤔
                    </h5>
                </div>

                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    ariaLabel="form"
                    ariaRoledescription="form"
                    className="w-4/5"
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

            <Container
                className={cls(
                    "overflow-y-hidden relative -bottom-4 transition duration-1000 ease-in",
                    searching ? "translate-y-3/4" : ""
                )}
            >
                <Card className={cls(`bg-[#000]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#99FFAA]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#FF99AA]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#AA99FF]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#9A9F99]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#FAA99F]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#000]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#FF99AA]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#99FFAA]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#AA99FF]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#000]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#FF99AA]`)} size={"first"}></Card>
                <Card className={cls(`bg-[#99FFAA]`)} size={"second"}></Card>
                <Card className={cls(`bg-[#AA99FF]`)} size={"third"}></Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}></Card>
            </Container>
        </Layout>
    );
};

export default Home;
