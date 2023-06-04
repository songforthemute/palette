import { FC, MutableRefObject, forwardRef } from "react";
import s from "./Select.module.css";

interface Props {
    options: string[];
}

const Select: FC<Props> = forwardRef(({ options, ...props }, ref) => {
    return (
        <select
            ref={ref as MutableRefObject<HTMLSelectElement>}
            role="combobox"
            className={s.root}
            {...props}
        >
            {options.map((v) => (
                <option className={s.option} value={v} key={v} role="option">
                    {v}
                </option>
            ))}
        </select>
    );
});

Select.displayName = "Select";

export default Select;
