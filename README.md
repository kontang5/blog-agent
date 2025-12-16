# Blog Agent

An AI-powered CLI application that provides a conversational interface for managing blog posts. Interact with API
backend through natural language commands.

## Features

- Interactive command-line interface with natural language processing
- Full CRUD operations for blog posts (create, read, update, delete)
- LLM integration via LM Studio for intent understanding
- Tool execution cycle for automated API operations

## Prerequisites

- Node.js 20+
- [LM Studio](https://lmstudio.ai/) running locally with a loaded model
- API backend for blog posts

## Installation

```bash
npm install
```

## Configuration

Copy the environment template and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
LM_STUDIO_BASE_URL=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
SPRING_API_BASE_URL=http://localhost:8080
SPRING_API_USERNAME=your-username
SPRING_API_PASSWORD=your-password
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

### Example Commands

Once running, interact with the agent using natural language:

```
> Show all posts
> Create a post titled "Hello World" with content about TypeScript
> Update post 1 with a new title "Updated Title"
> Delete post 3
> exit
```

## Project Structure

```
src/
├── index.ts              # CLI entry point with REPL loop
├── config.ts             # Environment configuration
├── types/
│   └── index.ts          # TypeScript interfaces
├── agent/
│   └── llm-client.ts     # LM Studio API client
├── api/
│   └── post-api.ts       # Spring API client
└── tools/
    └── post-tools.ts     # Tool definitions and executor
```

## Available Tools

The agent can execute the following operations:

| Tool          | Description               |
|---------------|---------------------------|
| `create_post` | Create a new blog post    |
| `get_posts`   | Retrieve all blog posts   |
| `get_post`    | Get a specific post by ID |
| `update_post` | Update an existing post   |
| `delete_post` | Delete a post             |
