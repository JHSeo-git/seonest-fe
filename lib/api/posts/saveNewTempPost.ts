import { PostAllContentType } from '@/lib/recoil/writeState';
import client from '../client';
import { Post } from './types';

export default async function saveNewTempPost({
  title,
  markdown,
  shortDescription,
  thumbnailUrl,
}: PostAllContentType) {
  const response = await client.post<Post>(`/api/temps/new`, {
    title,
    body: markdown,
    shortDescription,
    thumbnail: thumbnailUrl,
  });

  return response.data;
}
