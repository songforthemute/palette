import type { ColorType } from "./types";

/**
 * @param {string} rgb **RGB** color code alike `"255, 150, 50"`
 * @returns {string} **HEX** color code alike `"#FF9632"`
 *---
 * @description
 * #### Convert from **RGB** to **HEX**(hexadecimal) color code.
 * - In the R-G-B code, each Color is 1 byte(8 bits).
 * - So each color is shited by 8 bits.
 * - _Ex. red(16), green(8), blue(0)_
 *---
 * @example
 * ```typescript
 * const rgb = "255, 150, 50";
 * const hex = rgbToHex(rgb);
 * console.log(hex); // "#FF9632"
 * ```
 */
const rgbToHex = (rgb: string): string => {
    const sharp = "#";
    const [red, green, blue] = rgb.split(",").map((value) => parseInt(value));

    let hexa = ((red << 16) + (green << 8) + blue).toString(16);

    // if red is less than 16
    if (hexa.length !== 6) hexa = "0" + hexa;

    return sharp + hexa.toUpperCase();
};

/**
 * @param {string} hex **HEX** color code alike `"#FF9632"`
 * @returns {string} **RGB** color code alike `"255, 150, 50"`
 *---
 * @description
 * #### Convert from **HEX** to **RGB** color code.
 *---
 * @example
 * ```typescript
 * const hex = "#FF9632";
 * const rgb = hexToRgb(hex);
 * console.log(rgb); // "255, 150, 50"
 * ```
 */
const hexToRgb = (hex: string): string => {
    const rgb: number[] = [];
    let buffer: string = "";

    // exclude "#"
    for (let i = 1; i < hex.length; i++) {
        buffer += hex[i];

        if (buffer.length === 2) {
            rgb.push(parseInt(buffer, 16));
            buffer = "";
        }
    }

    return rgb.join(", ");
};

/**
 * @param {string} value Color code value alike `"#FF9632"`
 * @param {ColorType} target Color type alike `"HEX"`
 * @returns {string} Convert the code from current color type, to the other type.
 *---
 * @description
 * #### Convert the code from current color type, to the `target` type.
 *---
 * @example
 * ```typescript
 * const code1 = "#FF9632";
 * const code2 = convertColorType(code1); // "255, 150, 50"
 * const code3 = convertColorType(code2); // "#FF9632"
 * ```
 */
const convertColorType = (value: string, target: ColorType): string => {
    // HEX to RGB
    if (target === "RGB") {
        if (value[0] !== "#") return value;
        return hexToRgb(value);
    }
    // RGB to HEX
    else {
        if (value[0] === "#") return value;
        return rgbToHex(value);
    }
};

export default convertColorType;
