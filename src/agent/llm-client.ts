import OpenAI from "openai";
import { config } from "../config.js";
import { ToolDefinition } from "../types/index.js";

const client = new OpenAI({
  baseURL: config.lmStudio.baseUrl,
  apiKey: "lm-studio",
});

export async function chat(
  messages: OpenAI.ChatCompletionMessageParam[],
  tools: ToolDefinition[]
): Promise<OpenAI.ChatCompletion> {
  const completion = await client.chat.completions.create({
    model: config.lmStudio.model,
    messages,
    tools,
  });
  return completion;
}
