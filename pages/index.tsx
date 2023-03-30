import { Button, Card, Container, Form, Input } from "@components/Atoms";
import Layout from "@components/layout";
import { cls } from "@libs/functions";
import { useRouter } from "next/router";
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

        push(`/${data.keyword}`);
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
                <Card className={cls(`bg-[#000]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FF99AA]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#99FFAA]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AA99FF]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#9A9F99]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FAA99F]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#000]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FFFFFF]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FF99AA]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#99FFAA]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AA99FF]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#9A9F99]`)} size={"first"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#FAA99F]`)} size={"second"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
                <Card className={cls(`bg-[#AABBCC]`)} size={"third"}>
                    <Button className="absolute bottom-3 left-3 p-2.5 h-6 text-xs leading-[0.25rem]">
                        HEX
                    </Button>
                    <Button className="absolute bottom-3 left-[4rem] p-2.5 h-6 text-xs leading-[0.25rem]">
                        RGB
                    </Button>
                </Card>
            </Container>
        </Layout>
    );
};

export default Home;
