import { cls } from "@libs/utils";
import type { FC, MouseEventHandler, ReactNode } from "react";
import { memo } from "react";
import s from "./Button.module.css";

interface Props {
    children?: ReactNode | string | any;
    className?: string;
    onClick?: MouseEventHandler;
}

const Button: FC<Props> = ({ children, className = "", onClick, ...rest }) => {
    return (
        <button onClick={onClick} className={cls(s.root, className)} {...rest}>
            {children}
        </button>
    );
};

export default memo(Button);
