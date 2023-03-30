import { cls } from "@libs/functions";
import type { CSSProperties, FC, ReactNode } from "react";
import s from "./Card.module.css";

interface Props {
    style?: CSSProperties;
    className?: string;
    size: "first" | "second" | "third";
    children?: ReactNode | string | any;
}

const Card: FC<Props> = ({ className = "", size, children, style }) => {
    return (
        <div style={style} className={cls(className, s.root, s[size])}>
            {children}
        </div>
    );
};

export default Card;
