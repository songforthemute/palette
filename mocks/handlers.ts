import { rest } from "msw";

export const handlers = [
    rest.post<{ [key: string]: string }>(
        "/api/apple?counts=20",
        (req, res, ctx) => {
            const response = {
                "Apple Red": "#FF0000",
                "Apple Blossom": "#EEA6AC",
                "Green Apple": "#A6CC50",
            };

            return res(ctx.status(200), ctx.json(response));
        }
    ),
];
