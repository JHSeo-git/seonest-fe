import getCategory from '@/helpers/api/categories/getCategoryBySlug';
import { Category } from '@/helpers/api/categories/types';
import {
  FetchQueryOptions,
  QueryClient,
  useQuery,
  UseQueryOptions,
} from 'react-query';

export default function useGetCategoryBySlugQuery(
  slug: string,
  options:
    | Omit<
        UseQueryOptions<Category, unknown, Category, (string | number)[]>,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useQuery(createKey(slug), () => getCategory(slug), options);
}

export async function prefetchGetCategoryBySlugQuery(
  slug: string,
  oldQueryClient?: QueryClient,
  options:
    | FetchQueryOptions<
        Category,
        unknown,
        Category,
        string | readonly unknown[]
      >
    | undefined = {}
) {
  let queryClient: QueryClient | undefined = oldQueryClient;
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  await queryClient.prefetchQuery(
    createKey(slug),
    () => getCategory(slug),
    options
  );
  return queryClient;
}

const createKey = (slug: string) => ['category', slug];
useGetCategoryBySlugQuery.createKey = createKey;
