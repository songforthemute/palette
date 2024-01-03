const OpenAI = require("openai");

// singleton instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getCompletion = async (content: string) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content }],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0];
};
