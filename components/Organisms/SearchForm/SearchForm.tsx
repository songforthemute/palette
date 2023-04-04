import { Form, Input } from "@components/Atoms";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormInterface {
    id: string;
}

interface Props {
    onSubmit: (data?: any) => void;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
}

const SearchForm = ({
    onSubmit,
    className = "",
    placeholder = "Hi there!",
    defaultValue,
}: Props) => {
    const { register, handleSubmit, setValue } = useForm<FormInterface>({
        reValidateMode: "onBlur",
    });

    useEffect(() => {
        if (defaultValue) setValue("id", defaultValue);
    }, [defaultValue]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            ariaLabel="form"
            ariaRoledescription="Search color form by keyword"
            className={className}
        >
            <Input
                required
                placeholder={placeholder}
                {...register("id", {
                    required: "검색할 키워드를 입력해주세요.",
                    minLength: {
                        value: 2,
                        message: "2자 이상으로 입력해주세요.",
                    },
                })}
            />
        </Form>
    );
};

export default SearchForm;
