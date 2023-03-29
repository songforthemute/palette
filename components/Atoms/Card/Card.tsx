import { cls } from "@libs/functions";
import type { FC, ReactNode } from "react";
import s from "./Card.module.css";

interface Props {
    className?: string;
    size: "first" | "second" | "third";
    children?: ReactNode | string | any;
}

const Card: FC<Props> = ({ className = "", size, children }) => {
    return <div className={cls(className, s.root, s[size])}>{children}</div>;
};

export default Card;
