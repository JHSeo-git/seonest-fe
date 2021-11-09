import client from '../client';
import { Category } from './types';

export default async function getCategories() {
  const response = await client.get<Category[]>('/api/categories');

  return response.data;
}
