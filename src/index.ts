import * as readline from "readline";
import OpenAI from "openai";
import { chat } from "./agent/llm-client.js";
import { toolDefinitions, executeTool } from "./tools/post-tools.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are a helpful blog assistant. You can create, read, update, and delete blog posts.",
  },
];

async function processUserInput(input: string): Promise<string> {
  messages.push({ role: "user", content: input });

  let completion = await chat(messages, toolDefinitions);
  let assistantMessage = completion.choices[0].message;

  // Tool call loop
  while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
    messages.push(assistantMessage);

    for (const toolCall of assistantMessage.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);
      console.log(`\n[Tool] ${toolCall.function.name}(${JSON.stringify(args)})`);

      const result = await executeTool(toolCall.function.name, args);
      console.log(`[Result] ${JSON.stringify(result)}`);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    completion = await chat(messages, toolDefinitions);
    assistantMessage = completion.choices[0].message;
  }

  messages.push(assistantMessage);
  return assistantMessage.content || "";
}

function prompt(): void {
  rl.question("\nYou: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    try {
      const response = await processUserInput(input);
      console.log(`\nAssistant: ${response}`);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    }

    prompt();
  });
}

console.log("Blog Agent CLI (type 'exit' to quit)");
prompt();
