import { cls } from "@libs/functions";
import type { FC, ReactNode } from "react";
import s from "./Container.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
}

const Container: FC<Props> = ({ children, className = "" }) => {
    return <div className={cls(s.root, className)}>{children}</div>;
};

export default Container;
