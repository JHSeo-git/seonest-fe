import client from '../client';
import { Post } from './types';

export default async function getPosts(
  userId?: number,
  cursor?: number,
  takeLatest?: number
) {
  const response = await client.get<Post[]>('/api/posts', {
    params: {
      user_id: userId,
      cursor,
      take_latest: takeLatest,
    },
  });

  return response.data;
}
