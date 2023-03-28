import { Configuration, OpenAIApi } from "openai";

// singleton instance
declare global {
    var __configuration: Configuration | undefined;
    var __openai: OpenAIApi | undefined;
}

const __configuration =
    global?.__configuration ??
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

if (process.env.NODE_ENV === "development")
    global.__configuration = __configuration;

const __openai = global?.__openai ?? new OpenAIApi(__configuration);

if (process.env.NODE_ENV === "development") global.__openai = __openai;

export default __openai;
