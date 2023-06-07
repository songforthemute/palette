import { cls } from "@libs/utils";
import { forwardRef, MutableRefObject } from "react";
import s from "./Input.module.css";

interface Props {
    className?: string;
    required?: boolean;
    placeholder: string;
    disabled?: boolean;
}

const Input = forwardRef(
    (
        {
            className = "",
            required = false,
            disabled = false,
            placeholder,
            ...rest
        }: Props,
        ref
    ) => {
        return (
            <input
                ref={ref as MutableRefObject<HTMLInputElement>}
                type="text"
                className={cls(
                    s.root,
                    className,
                    disabled ? s.disabled : s.enabled
                )}
                autoComplete="true"
                autoCorrect="true"
                autoCapitalize="false"
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;
