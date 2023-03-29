// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import __openai from "@libs/client";

type Data = {
    keyword: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, query } = req;

    console.log(body, query);

    return res.status(200).json({
        keyword: req.body.keyword,
    });
}
