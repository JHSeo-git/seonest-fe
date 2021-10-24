import client from '../client';
import { Post } from './types';

export default async function getLastTempPost(slug: string) {
  const response = await client.get<Post>(`/api/temps/${encodeURI(slug)}`);

  return response.data;
}
