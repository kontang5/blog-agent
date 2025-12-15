import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { config } from "../config.js";
import { Post, CreatePostRequest, UpdatePostRequest } from "../types/index.js";

const jar = new CookieJar();
const api = wrapper(axios.create({
  baseURL: config.springApi.baseUrl,
  jar,
}));

let isLoggedIn = false;

export async function login(username: string, password: string): Promise<void> {
  await api.post("/v1/auth/login", { username, password });
  isLoggedIn = true;
}

async function ensureLoggedIn(): Promise<void> {
  if (!isLoggedIn) {
    await login(config.springApi.username, config.springApi.password);
  }
}

export async function createPost(req: CreatePostRequest): Promise<Post> {
  await ensureLoggedIn();
  const { data } = await api.post<Post>("/v1/posts", req);
  return data;
}

export async function getPosts(): Promise<Post[]> {
  await ensureLoggedIn();
  const { data } = await api.get<Post[]>("/v1/posts");
  return data;
}

export async function getPost(id: number): Promise<Post> {
  await ensureLoggedIn();
  const { data } = await api.get<Post>(`/v1/posts/${id}`);
  return data;
}

export async function updatePost(id: number, req: UpdatePostRequest): Promise<Post> {
  await ensureLoggedIn();
  const { data } = await api.put<Post>(`/v1/posts/${id}`, req);
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await ensureLoggedIn();
  await api.delete(`/v1/posts/${id}`);
}
