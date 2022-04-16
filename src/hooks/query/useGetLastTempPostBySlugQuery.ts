import { QueryClient, useQuery, UseQueryOptions } from 'react-query';
import getLastTempPost from '@/lib/api/posts/getLastTempPost';
import { Post } from '@/lib/api/posts/types';

export default function useGetLastTempPostBySlugQuery(
  slug: string,
  options:
    | Omit<
        UseQueryOptions<Post, unknown, Post, string[]>,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useQuery(createKey(slug), () => getLastTempPost(slug), options);
}

export async function prefetchGetLastTempPostBySlugQuery(
  slug: string,
  oldQueryClient?: QueryClient,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  let queryClient: QueryClient | undefined = oldQueryClient;
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  await queryClient.prefetchQuery(
    createKey(slug),
    () => getLastTempPost(slug),
    options
  );
  return queryClient;
}

const createKey = (slug: string) => ['tempPost', slug];
useGetLastTempPostBySlugQuery.createKey = createKey;
