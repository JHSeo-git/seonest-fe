import { PostAllContentType } from '@/helpers/types/types';
import client from '../client';
import { Post } from './types';

export default async function updatePost(
  slug: string,
  {
    title,
    markdown,
    shortDescription,
    thumbnailUrl,
    categories,
  }: PostAllContentType
) {
  const response = await client.put<Post>(`/api/posts/${slug}`, {
    title,
    body: markdown,
    shortDescription,
    thumbnail: thumbnailUrl,
    categories,
  });

  return response.data;
}
