import { cls } from "@libs/functions";
import type { FC, FormEventHandler, ReactNode } from "react";
import s from "./Form.module.css";

interface Props {
    children?: ReactNode | any;
    ariaRoledescription: string;
    ariaLabel: string;
    className?: string;
    onSubmit: FormEventHandler;
}

const Form: FC<Props> = ({
    className = "",
    ariaLabel,
    children,
    ariaRoledescription,
    onSubmit,
    ...rest
}) => {
    return (
        <form
            className={cls(s.root, className)}
            role={"form"}
            aria-label={ariaLabel}
            aria-roledescription={ariaRoledescription}
            onSubmit={onSubmit}
            {...rest}
        >
            {children}
        </form>
    );
};

export default Form;
