// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import __openai from "@libs/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        query: { id, counts },
        method,
    } = req;

    if (method !== "POST") {
        res.status(405).json({ status: false, message: "Invalid method." });
        return;
    }

    const max_tokens = 32 * Number(counts || 20);

    const {
        data: { choices },
    } = await __openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Please recommend ${counts} words related to '${id}' and HEX code related to each word. It's '{ "word": "#FFFFFF", ... }' shape of the JSON type.`,
        max_tokens,
    });

    const { text } = choices[0];
    // console.log(text);

    try {
        const payload = JSON.parse(text ?? "{}");
        // console.log(payload);

        res.status(200).json({
            payload,
        });
    } catch (e) {
        res.status(404).json({
            error: "Please check your settings or network status.",
        });
    }
}
