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
        "0": "#FFFFFF30",
        "1": "#FFFFFF30",
        "2": "#FFFFFF30",
        "3": "#FFFFFF30",
        "4": "#FFFFFF30",
        "5": "#FFFFFF30",
        "6": "#FFFFFF30",
        "7": "#FFFFFF30",
        "8": "#FFFFFF30",
        "9": "#FFFFFF30",
        "10": "#FFFFFF30",
        "11": "#FFFFFF30",
        "12": "#FFFFFF30",
        "13": "#FFFFFF30",
        "14": "#FFFFFF30",
        "15": "#FFFFFF30",
        "16": "#FFFFFF30",
        "17": "#FFFFFF30",
        "18": "#FFFFFF30",
        "19": "#FFFFFF30",
        "20": "#FFFFFF30",
        "21": "#FFFFFF30",
        "22": "#FFFFFF30",
        "23": "#FFFFFF30",
        "24": "#FFFFFF30",
        "25": "#FFFFFF30",
        "26": "#FFFFFF30",
        "27": "#FFFFFF30",
        "28": "#FFFFFF30",
        "29": "#FFFFFF30",
    };

    return { ...initObj };
};
