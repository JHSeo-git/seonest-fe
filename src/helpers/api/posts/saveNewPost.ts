import { PostAllContentType } from '@/helpers/types/types';
import client from '../client';
import { Post } from './types';

export default async function saveNewPost({
  title,
  markdown,
  shortDescription,
  thumbnailUrl,
  categories,
}: PostAllContentType) {
  const response = await client.post<Post>('/api/posts/new', {
    title,
    body: markdown,
    shortDescription,
    thumbnail: thumbnailUrl,
    categories,
  });

  return response.data;
}
