import Head from "next/head";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import s from "./layout.module.css";

interface Props {
    title: string;
    metaDescription: string;
    hasBackward?: boolean;
    children: ReactNode;
}

const Layout: FC<Props> = ({
    title,
    metaDescription,
    hasBackward = false,
    children,
}) => {
    const { back } = useRouter();

    return (
        <>
            <Head>
                <title>{`${title} | Palette`}</title>
                <meta name="description" content={metaDescription} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <>
                {/* <header> */}
                {/* 뒤로가기 버튼, 사이드 바? */}
                {/* </header> */}

                <main className={s.main}>{children}</main>

                {/* <footer> */}
                {/* copyright */}
                {/* </footer> */}
            </>
        </>
    );
};

export default Layout;
