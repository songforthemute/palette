// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import __openai from "@libs/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        // body,
        query: { id },
        method,
    } = req;

    if (method !== "POST") {
        res.status(405).json({ status: false, message: "Invalid method." });
        return;
    }

    const {
        data: { choices },
    } = await __openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Please recommend 20 words related to '${id}' and HEX code related to each word. Like '{ "word": "#FFFFFF", ... }' shape or JSON type.`,
        max_tokens: 640,
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
        res.status(200).json({
            error: "Please check your settings or network status.",
        });
    }
}
