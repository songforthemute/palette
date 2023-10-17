import { Card } from "@components/Atoms";
import { getRandomCardSize, getRandomHexColorCode } from "@libs/utils";
import { useState, useEffect } from "react";

type exampleCardType = [string, "first" | "second" | "third"];

const ExampleCards = () => {
    const [examples, setExamples] = useState<exampleCardType[]>([]);
    /**
     * SOLVED ERROR: Prop `style` did not match.
     *  When serverSideRender in Next.js,
     *  An error occurred when did not accord between Client-HTML & HTML by Server
     *  cf. Hydration UI Error
     */
    useEffect(() => {
        setExamples(
            Array.from(Array(21), () => [
                getRandomHexColorCode(),
                getRandomCardSize(),
            ])
        );
    }, []);

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
            {examples.map(([color, size], i) => (
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
