import { ToolDefinition, ToolResult } from "../types/index.js";
import * as postApi from "../api/post-api.js";

export const toolDefinitions: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "create_post",
      description: "Create a new blog post",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "The title of the post" },
          content: { type: "string", description: "The content of the post" },
        },
        required: ["title", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_posts",
      description: "Get all blog posts",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_post",
      description: "Get a specific blog post by ID",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number", description: "The ID of the post" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_post",
      description: "Update an existing blog post",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number", description: "The ID of the post to update" },
          title: { type: "string", description: "The new title of the post" },
          content: { type: "string", description: "The new content of the post" },
        },
        required: ["id", "title", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_post",
      description: "Delete a blog post",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number", description: "The ID of the post to delete" },
        },
        required: ["id"],
      },
    },
  },
];

export async function executeTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  try {
    switch (name) {
      case "create_post":
        const created = await postApi.createPost({
          title: args.title as string,
          content: args.content as string,
        });
        return { success: true, data: created };

      case "get_posts":
        const posts = await postApi.getPosts();
        return { success: true, data: posts };

      case "get_post":
        const post = await postApi.getPost(args.id as number);
        return { success: true, data: post };

      case "update_post":
        const updated = await postApi.updatePost(args.id as number, {
          title: args.title as string,
          content: args.content as string,
        });
        return { success: true, data: updated };

      case "delete_post":
        await postApi.deletePost(args.id as number);
        return { success: true, data: { message: "Post deleted successfully" } };

      default:
        return { success: false, error: `Unknown tool: ${name}` };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
