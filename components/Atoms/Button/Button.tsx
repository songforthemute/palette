import { cls } from "@libs/functions";
import type { FC, ReactNode } from "react";
import s from "./Button.module.css";

interface Props {
    children?: ReactNode | string | any;
    className?: string;
}

const Button: FC<Props> = ({ children, className = "", ...rest }) => {
    return (
        <button className={cls(s.root, className)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
