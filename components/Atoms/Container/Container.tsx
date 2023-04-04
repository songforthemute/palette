import { cls } from "@libs/functions";
import { FC, ReactNode, Ref, forwardRef } from "react";
import s from "./Container.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}

const Container: FC<Props> = forwardRef(
    ({ className = "", children }: Props, ref?: Ref<HTMLDivElement>) => {
        return (
            <div ref={ref} className={cls(s.root, className)}>
                {children}
            </div>
        );
    }
);

Container.displayName = "Container";

export default Container;
