import {
  FetchInfiniteQueryOptions,
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import getRawCategories from '@/helpers/api/categories/getRawCategoriesBySlug';
import { RawCategory } from '@/helpers/api/categories/types';

// TODO: add takeLatest prop
export default function useGetRawCategoriesBySlugQuery(
  slug: string,
  options:
    | Omit<
        UseInfiniteQueryOptions<
          RawCategory[],
          unknown,
          RawCategory[],
          RawCategory[],
          string[]
        >,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useInfiniteQuery(
    createKey(slug),
    ({ pageParam = undefined }: { pageParam?: number }) =>
      getRawCategories(slug, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].post_id : undefined,
      ...options,
    }
  );
}

export async function prefetchGetRawCategoriesBySlugQuery(
  slug: string,
  options:
    | FetchInfiniteQueryOptions<
        RawCategory[],
        unknown,
        RawCategory[],
        string | readonly unknown[]
      >
    | undefined = {}
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    createKey(slug),
    ({ pageParam = undefined }: { pageParam?: number }) =>
      getRawCategories(slug, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].post_id : undefined,
      ...options,
    }
  );
  return queryClient;
}

const createKey = (slug: string) => ['categories', slug];
useGetRawCategoriesBySlugQuery.createKey = createKey;
