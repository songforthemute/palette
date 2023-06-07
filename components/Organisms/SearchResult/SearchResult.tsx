import type { MouseEvent } from "react";
import { Button, Card } from "@components/Atoms";
import { cardSizeConvertor, cls, convertColorType } from "@libs/utils";
import s from "./SearchResult.module.css";

interface Props {
    loading: boolean;
    data: {
        [key: string]: string;
    };
    onClickCopy: (e: MouseEvent<HTMLButtonElement> | any) => void;
    onClickPoke: (e: MouseEvent<HTMLButtonElement> | any) => void;
}

const SearchResult = ({ data, loading, onClickCopy, onClickPoke }: Props) => {
    return (
        <>
            {Object.entries(data).map(([item, code], index) => (
                <Card
                    size={cardSizeConvertor(index)}
                    key={`item_${index}`}
                    style={{
                        backgroundColor: `${code}`,
                    }}
                    className={cls(
                        s.card__initial,
                        loading ? s.card__loading : ""
                    )}
                >
                    {loading ? null : (
                        <>
                            <div className={s.card__textbox}>
                                <span className="text-center mx-2">{item}</span>
                                <span className="text-center">{code}</span>
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
                                onClick={onClickPoke}
                                className={s.card__poke__btn}
                            >
                                ➕
                            </Button>
                        </>
                    )}
                </Card>
            ))}
        </>
    );
};

export default SearchResult;
