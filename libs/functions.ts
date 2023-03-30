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

export const hexToRGB = (hex: string): string => {
    const rbg = [];

    for (let i = 0; i < hex.length; i += 2) {
        rbg.push(
            (parseInt(hex[i], 16) + 1) * (parseInt(hex[i + 1], 16) + 1) - 1
        );
    }
    return rbg.join(", ");
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
