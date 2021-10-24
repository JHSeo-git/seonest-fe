import client from '../client';
import { Post } from './types';

export default async function getTempPosts(userId?: number, cursor?: number) {
  const response = await client.get<Post[]>('/api/temps', {
    params: {
      user_id: userId,
      cursor,
    },
  });

  return response.data;
}
