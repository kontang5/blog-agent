// Post types
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

// Tool types (OpenAI format)
export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, {
        type: string;
        description: string;
      }>;
      required: string[];
    };
  };
}

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

// Config types
export interface Config {
  lmStudio: {
    baseUrl: string;
    model: string;
  };
  springApi: {
    baseUrl: string;
    username: string;
    password: string;
  };
}
