import { Card, Container, Form, Input } from "@components/Atoms";
import Layout from "@components/layout";
import { cls } from "@libs/functions";
import useMutate from "@libs/useMutate";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormInterface {
    keyword: string;
}

const Home = () => {
    const { register, handleSubmit } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });
    const { push } = useRouter();

    const onSubmit = (data: any) => {
        console.log(data);

        // push(`/${data.keyword}`);
    };

    // const [func, { data, loading, error }] = useMutate<FormInterface>({
    //     url: "/api/test", // /api/hello
    //     method: "POST",
    // });

    // useEffect(() => {
    //     console.log(data);

    //     // push("/search")
    // }, [data]);

    return (
        <Layout
            title="Home"
            metaDescription="Palette Home page. Type the word and get colors."
        >
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

            <Container>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"first"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"third"} />

                <Card className={cls(`bg-[#FFFFFF]`)} size={"first"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"third"} />

                <Card className={cls(`bg-[#FFFFFF]`)} size={"first"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"third"} />

                <Card className={cls(`bg-[#FFFFFF]`)} size={"first"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"} />
                <Card className={cls(`bg-[#FFFFFF]`)} size={"third"} />
            </Container>
        </Layout>
    );
};

export default Home;
