import getCategories from '@/helpers/api/categories/getCategories';
import { Category } from '@/helpers/api/categories/types';
import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

export default function useGetCategoriesQuery(
  options:
    | Omit<
        UseQueryOptions<Category[], unknown, Category[], (string | number)[]>,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useQuery(createKey(), () => getCategories(), options);
}

export async function prefetchGetCategoriesQuery(
  oldQueryClient?: QueryClient,
  options: UseQueryOptions<Category[], unknown, Category[]> = {}
) {
  let queryClient: QueryClient | undefined = oldQueryClient;
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  await queryClient.prefetchQuery(createKey(), () => getCategories(), options);
  return queryClient;
}

const createKey = () => ['categories'];
useGetCategoriesQuery.createKey = createKey;
