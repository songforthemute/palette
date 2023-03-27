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
                BK: "#000",
            },
            opacity: {
                low: "0.3",
                medium: "0.5",
                high: "0.7",
            },
            ringColor: {
                WH: "#FFF",
                BK: "#000",
            },
            textColor: {
                WH: "#FFF",
                BK: "#000",
            },
        },
    },
    darkMode: "media",
};
