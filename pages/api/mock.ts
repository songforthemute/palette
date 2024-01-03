// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const delay = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body } = req;

    const response = {
        간식: "#FFE119",
        과자: "#FFD700",
        과일: "#228B22",
        디저트: "#FF69B4",
        초콜릿: "#8B4513",
        아이스크림: "#ADD8E6",
        과일스무디: "#FFDAB9",
        팝콘: "#A0522D",
        땅콩: "#D2691E",
        소세지: "#800000",
        크래커: "#FFFF00",
        젤리: "#FF7F50",
    };

    await delay(3000).then(() => {});

    return res.status(200).json({
        id: body,
        response,
    });
}
