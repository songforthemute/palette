import { Form, Input, Select } from "@components/Atoms";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface FormInterface {
    id: string;
    counts: string | any;
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
    const { register, handleSubmit, setValue, control } =
        useForm<FormInterface>({
            reValidateMode: "onBlur",
        });

    useEffect(() => {
        if (defaultValue) setValue("id", defaultValue);
    }, [defaultValue, setValue]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            ariaLabel="searching color form"
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
                    maxLength: {
                        value: 32,
                        message: "32자 이내로 입력해주세요.",
                    },
                })}
            />
            <Controller
                render={({ field }) => (
                    <Select {...field} options={["6", "9", "12", "15"]} />
                )}
                name="counts"
                defaultValue={"12"}
                control={control}
            />
        </Form>
    );
};

export default SearchForm;
