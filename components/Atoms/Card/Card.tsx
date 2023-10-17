import { cls } from "@libs/utils";
import type { CSSProperties, FC, ReactNode } from "react";
import { memo } from "react";
import s from "./Card.module.css";

interface Props {
    style?: CSSProperties;
    className?: string;
    size: "first" | "second" | "third";
    children?: ReactNode | string | any;
    testid?: string;
}

const Card: FC<Props> = ({
    className = "",
    size,
    children,
    style = {},
    testid,
}) => {
    return (
        <div
            style={style}
            data-testid={testid}
            className={cls(className, s.root, s[size])}
        >
            {children}
        </div>
    );
};

export default memo(Card);
