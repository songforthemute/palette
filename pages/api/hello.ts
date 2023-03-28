// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import __openai from "@libs/client";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
    const {
        data: { choices },
    } = await __openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Please recommend 20 words related to '${"apple"}' and HEX code related to each word. Like '{ "word": "code", ... }' shape or JSON type.`,
        max_tokens: 640,
    });

    const { text } = choices[0];
    console.log(text);

    try {
        const payload = JSON.parse(text ?? "{}");

        res.status(200).json({
            name: "John Doe",
            payload,
        });
    } catch (e) {
        res.status(200).json({
            name: "John Doe",
            text,
            // payload,
        });
    }
}
