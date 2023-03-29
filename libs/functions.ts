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
