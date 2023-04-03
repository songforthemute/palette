/**
 * @param {string}
 */
export const copy = () => {
    //
};

/**
 * @description Support for easy using classnames in TailwindCSS
 * @param {string[]} classNames To applying classnames
 * @returns {string}
 */
export const cls = (...classNames: string[]): string => {
    return classNames.join(" ");
};

const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.split(", ").map(Number);
    return (
        "#" +
        ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()
    );
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

export const convertColorType = (
    value: string,
    target: "HEX" | "RGB"
): string => {
    // hex to RGB
    if (target === "RGB") {
        if (value[0] !== "#") return value;
        return hexToRgb(value);
    }
    // RGB to hex
    else {
        if (value[0] === "#") return value;
        return rgbToHex(value);
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

export const initialResult = () => {
    const initObj = {
        "0": "#FFF",
        "1": "#FFF",
        "2": "#FFF",
        "3": "#FFF",
        "4": "#FFF",
        "5": "#FFF",
        "6": "#FFF",
        "7": "#FFF",
        "8": "#FFF",
        "9": "#FFF",
        "10": "#FFF",
        "11": "#FFF",
        "12": "#FFF",
        "13": "#FFF",
        "14": "#FFF",
        "15": "#FFF",
        "16": "#FFF",
        "17": "#FFF",
        "18": "#FFF",
        "19": "#FFF",
        "20": "#FFF",
        "21": "#FFF",
        "22": "#FFF",
        "23": "#FFF",
        "24": "#FFF",
        "25": "#FFF",
        "26": "#FFF",
        "27": "#FFF",
        "28": "#FFF",
        "29": "#FFF",
    };

    return { ...initObj };
};
