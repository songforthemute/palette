/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                WH: "#FFF",
                GR: "#BBB",
                BK: "#111",
            },
            opacity: {
                low: "0.3",
                medium: "0.5",
                high: "0.7",
            },
            ringColor: {
                WH: "#FFF",
                GR: "#BBB",
                BK: "#111",
            },
            textColor: {
                WH: "#FFF",
                GR: "#BBB",
                BK: "#111",
            },
        },
    },
    darkMode: "media",
    // plugins: [require("@tailwindcss/forms")],
};
