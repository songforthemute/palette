import convertColorType from "./convertColorType";

/**
 * @description Support for easy using classnames in TailwindCSS
 * @param {string[]} classNames To applying classnames
 * @returns {string}
 */
export const cls = (...classNames: string[]): string => {
    return classNames.join(" ");
};

export const isColorDark = (color: string): Boolean => {
    const ratio: number = 35;
    const avg: number =
        convertColorType(color, "RGB")
            .split(", ")
            .map(Number)
            .reduce((pre, cur) => pre + cur, 0) / 3;

    return avg < ratio ? true : false;
};

export const getRandomHexColorCode = () => {
    const rgb = Array.from(Array(3), () => Math.floor(Math.random() * 255));

    const hexCode = rgb.map((value) => {
        const code = value.toString(16);
        return code.length === 2 ? code : "0" + code;
    });

    return `#${hexCode.join("")}`;
};

export const getRandomCardSize = (): "first" | "second" | "third" => {
    const num = Math.floor(Math.random() * 3) + 1;

    switch (num) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        default:
            return "first";
    }
};

export const cardSizeConvertor = (
    size: number
): "first" | "second" | "third" => {
    switch (size % 3) {
        case 0:
            return "first";
        case 1:
            return "second";
        default:
            return "third";
    }
};

export const getInitialResult = () => {
    const limit = 10;
    const initColor = "#FFFFFF01";

    const initObj: { [key: string]: string } = {};

    for (let i = 0; i < limit; i++) {
        initObj[i] = initColor;
    }

    return { ...initObj };
};
