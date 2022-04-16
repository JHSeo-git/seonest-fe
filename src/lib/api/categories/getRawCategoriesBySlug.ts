import client from '../client';
import { RawCategory } from './types';

export default async function getRawCategories(
  slug: string,
  cursor?: number,
  takeLatest?: number
) {
  const response = await client.get<RawCategory[]>(
    `/api/categories/raw/${slug}`,
    {
      params: {
        cursor,
        take_latest: takeLatest,
      },
    }
  );

  return response.data;
}
