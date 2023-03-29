import Input from "@components/Atoms/Input";
import Layout from "@components/layout";
import { Form } from "@components/Molecoules";
import useMutate from "@libs/useMutate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormInterface {
    keyword: string;
}

const Home = () => {
    const { register, handleSubmit } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });

    const onSubmit = (data: any) => {
        console.log(data);

        func(data);
    };

    const [func, { data, loading, error }] = useMutate<FormInterface>({
        url: "/api/test", // /api/hello
        method: "POST",
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Layout
            title="Home"
            metaDescription="Palette Home page. Type the word and get colors."
        >
            <div>Hi there 🤔</div>
            <div>{String(data)}</div>

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
        </Layout>
    );
};

export default Home;
