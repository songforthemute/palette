import type { MouseEvent } from "react";
import { Button, Card } from "@components/Atoms";
import { cardSizeConvertor, cls, isColorDark } from "@libs/utils";
import convertColorType from "@libs/convertColorType";
import s from "./SearchResult.module.css";

interface Props {
    loading: boolean;
    data: {
        [key: string]: string;
    };
    onClickCopy: (e: MouseEvent<HTMLButtonElement> | any) => void;
    onClickPoke: (e: MouseEvent<HTMLButtonElement> | any) => void;
}

const INIT_COLOR = "#FFFFFF00";

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
                            <div
                                className={
                                    isColorDark(code)
                                        ? s.card__textbox__dark
                                        : s.card__textbox
                                }
                            >
                                <span className="text-center mx-2">{item}</span>
                                <span className="text-center">{code}</span>
                            </div>
                            <Button
                                data-item={item}
                                data-code={code}
                                onClick={onClickPoke}
                                className={cls(
                                    s.card__poke__btn,
                                    code === INIT_COLOR ? "opacity-[0.01]" : ""
                                )}
                            >
                                ➕
                            </Button>

                            <Button
                                data-item={item}
                                data-code={code}
                                onClick={onClickCopy}
                                className={cls(
                                    s.card__hex__btn,
                                    code === INIT_COLOR ? "opacity-[0.01]" : ""
                                )}
                            >
                                HEX
                            </Button>
                            <Button
                                data-item={item}
                                data-code={convertColorType(code, "RGB")}
                                onClick={onClickCopy}
                                className={cls(
                                    s.card__rgb__btn,
                                    code === INIT_COLOR ? "opacity-[0.01]" : ""
                                )}
                            >
                                RGB
                            </Button>
                        </>
                    )}
                </Card>
            ))}
        </>
    );
};

export default SearchResult;
