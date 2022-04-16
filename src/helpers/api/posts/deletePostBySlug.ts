import client from '../client';

export default async function deletePostBySlug(slug: string) {
  const response = await client.delete(`/api/posts/${encodeURI(slug)}`);

  return response.status === 204;
}
