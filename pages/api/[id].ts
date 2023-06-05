// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import __openai from "@libs/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // console.time("ch");

    const {
        query: { id, counts },
        method,
    } = req;

    if (method !== "POST") {
        res.status(405).json({ status: false, message: "Invalid method." });
        return;
    }

    const kinds = counts ? +counts : 10;
    const max_tokens = kinds * 22;

    const {
        data: { choices },
    } = await __openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recommend ${kinds} words related to '${id}' and HEX color code related to each word. They're '{ "word": "#FFFFFF", ... }' shape of the JSON type.`,
        temperature: 0.55,
        max_tokens,
        n: 1,
        best_of: 1,
    });

    const { text } = choices[0];
    // console.log(text);

    try {
        const payload = JSON.parse(text || "{}");
        // console.timeEnd("ch");
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
