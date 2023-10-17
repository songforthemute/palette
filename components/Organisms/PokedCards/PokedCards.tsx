import { Button, Card } from "@components/Atoms";
import convertColorType from "@libs/convertColorType";
import type { MouseEvent } from "react";
import s from "./PokedCards.module.css";

interface Props {
    data: {
        [key: string]: string;
    };
    onClickCopy: (e: MouseEvent<HTMLButtonElement> | any) => void;
    onClickClear: (e: MouseEvent<HTMLButtonElement> | any) => void;
}

const PokedCards = ({ data, onClickClear, onClickCopy }: Props) => {
    return (
        <>
            {Object.entries(data)?.map(([item, code], index) => (
                <Card
                    testid={code}
                    size={"first"}
                    key={`item_${index}`}
                    style={{
                        backgroundColor: `${code}`,
                    }}
                    className={s.card__intial}
                >
                    <div className={s.card__textbox}>
                        <span className="mx-2">{item}</span>
                        <span>{code}</span>
                    </div>
                    <Button
                        data-item={item}
                        data-code={code}
                        onClick={onClickCopy}
                        className={s.card__hex__btn}
                    >
                        HEX
                    </Button>
                    <Button
                        data-item={item}
                        data-code={convertColorType(code, "RGB")}
                        onClick={onClickCopy}
                        className={s.card__rgb__btn}
                    >
                        RGB
                    </Button>
                    <Button
                        data-item={item}
                        data-code={code}
                        onClick={onClickClear}
                        className={s.card__clear__btn}
                    >
                        ✖️
                    </Button>
                </Card>
            ))}
        </>
    );
};

export default PokedCards;
