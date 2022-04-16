import getPosts from '@/helpers/api/posts/getPosts';
import { Post } from '@/helpers/api/posts/types';
import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

export default function useGetPostsByLatestQuery(
  userId?: number,
  takeLatest = 5,
  options:
    | Omit<
        UseQueryOptions<Post[], unknown, Post[], (string | number)[]>,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useQuery(
    createKey(takeLatest),
    () => getPosts(userId, undefined, takeLatest),
    options
  );
}

export async function prefetchGetPostsByLatestQuery(
  userId?: number,
  takeLatest = 5,
  oldQueryClient?: QueryClient,
  options: UseQueryOptions<Post[], unknown, Post[]> = {}
) {
  let queryClient: QueryClient | undefined = oldQueryClient;
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  await queryClient.prefetchQuery(
    createKey(takeLatest),
    () => getPosts(userId, undefined, takeLatest),
    options
  );
  return queryClient;
}

const createKey = (takeLatest: number) => ['latestPost', takeLatest];
useGetPostsByLatestQuery.createKey = createKey;
