import type { NextApiRequest, NextApiResponse } from "next";
import { getCompletion } from "@libs/opneai";

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

    const kinds = counts ? +counts : 10;
    // const max_tokens = kinds * 30;

    // const prompt = `Recommend ${kinds} words related to '${id}' and HEX color code related to each word. They're '{ "word": "#FFFFFF" }' shape of the JSON type.`;
    const prompt2 = `'${id}'와 관련된 키워드와 HEX 색상 코드를 ${kinds}개 추천해주세요. '{ "키워드": "#FFFFFF", ... }' 의 형태로 답변하세요.`;

    const result = await getCompletion(prompt2);
    const json = await JSON.parse(result?.message.content);

    // console.log(json);

    try {
        res.status(200).json({
            response: json,
        });
    } catch (e) {
        res.status(404).json({
            error: "Please check your settings or network status.",
        });
    }
}
