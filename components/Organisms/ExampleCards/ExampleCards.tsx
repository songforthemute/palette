import { Card } from "@components/Atoms";
import { getRandomCardSize, getRandomHexColorCode } from "@libs/functions";
// import { useEffect } from "react";

type exampleCardType = [string, "first" | "second" | "third"];

const ExampleCards = () => {
    let exampleColors: exampleCardType[] = Array.from(Array(21), () => [
        getRandomHexColorCode(),
        getRandomCardSize(),
    ]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         exampleColors = exampleColors.map()
    //     }, 2500)

    //     return () => {
    //         clearInterval(intervalId)
    //     }
    // }, [exampleColors])

    return (
        <>
            {exampleColors.map(([color, size], i) => (
                <Card
                    testid={color}
                    key={`example_${i}`}
                    style={{ backgroundColor: color }}
                    size={size}
                />
            ))}
        </>
    );
};

export default ExampleCards;
