// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    keyword: string;
};

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

    const payload = {
        "Apple Red": "#FF0000",
        "Apple Blossom": "#EEA6AC",
        "Green Apple": "#A6CC50",
        "Apple Cider": "#B47750",
        "Apple Core": "#B8A493",
        "Apple Pie": "#F5BD49",
        "Orangey Apple": "#ED7F37",
        "Cripps Red": "#CF3532",
        Macintosh: "#bdd5ea",
        iPhone: "#79ccf3",
        iPad: "#fad664",
        iPod: "#FB89E6",
        Siri: "#a5d5f7",
        MacBook: "#4eaef9",
        iMac: "#b1cdfe",
        "Apple Watch": "#f0dcd5",
        OSX: "#f9c3f1",
        iOS: "#A0DBCC",
        "Ginger Apple": "#BA5238",
        "Red Delicious": "#AF3134",
        "Golden Delicious": "#DB9400",
        "Fuji Apple": "#A2CD4B",
        "Ambrosia Apple": "#B49565",
        "Cinamon Apple": "#A75029",
        "Opal Apple": "#BA8740",
        "Granny Smith": "#94B13C",
        "Kiku Apple": "#C58F7F",
        "Pink Lady Apple": "#B875A4",
        "Jazz Apple": "#D76E39",
        "Cortland Apple": "#AB3A60",
    };

    await delay(3000).then(() => {});

    return res.status(200).json({
        id: body,
        payload,
    });
}
