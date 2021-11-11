import client from '../client';
import { Category } from './types';

export default async function getCategory(slug: string) {
  const response = await client.get<Category>(`/api/categories/${slug}`);

  return response.data;
}
