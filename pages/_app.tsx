import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="w-full h-max min-h-screen mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Component {...pageProps} />
        </div>
    );
}
