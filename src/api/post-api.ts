import axios from "axios";
import { config } from "../config.js";
import { Post, CreatePostRequest, UpdatePostRequest } from "../types/index.js";

const api = axios.create({
  baseURL: config.springApi.baseUrl,
});

export async function createPost(req: CreatePostRequest): Promise<Post> {
  const { data } = await api.post<Post>("/posts", req);
  return data;
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts");
  return data;
}

export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
}

export async function updatePost(id: number, req: UpdatePostRequest): Promise<Post> {
  const { data } = await api.put<Post>(`/posts/${id}`, req);
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}
