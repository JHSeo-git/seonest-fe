import client from '../client';
import { Post } from './types';

export default async function getAllPosts() {
  const response = await client.get<Post[]>('/api/posts/all', {});

  return response.data;
}
