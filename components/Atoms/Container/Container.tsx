import type { FC, ReactNode } from "react";
import s from "./Container.module.css";

interface Props {
    children?: ReactNode | any;
}

const Container: FC<Props> = ({ children }) => {
    return <div className={s.root}>{children}</div>;
};

export default Container;
