import { PostAllContentType } from '@/lib/recoil/writeState';
import client from '../client';
import { Post } from './types';

export default async function saveTempPost(
  slug: string,
  { title, markdown, shortDescription, thumbnailUrl }: PostAllContentType
) {
  const response = await client.put<Post>(`/api/temps/save/${slug}`, {
    title,
    body: markdown,
    shortDescription,
    thumbnail: thumbnailUrl,
  });

  return response.data;
}
