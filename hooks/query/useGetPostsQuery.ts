import {
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import getPosts from '@/lib/api/posts/getPosts';
import { Post } from '@/lib/api/posts/types';

// TODO: add takeLatest prop
export default function useGetPostsQuery(
  userId?: number,
  options:
    | Omit<
        UseInfiniteQueryOptions<
          Post[],
          unknown,
          Post[],
          Post[],
          (string | number)[]
        >,
        'queryKey' | 'queryFn'
      >
    | undefined = {}
) {
  return useInfiniteQuery(
    createKey(userId),
    ({ pageParam = undefined }) => getPosts(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].id : undefined,
      ...options,
    }
  );
}

export async function prefetchGetPostsQuery(
  userId?: number,
  options: UseInfiniteQueryOptions<Post[], unknown, Post[], Post[]> = {}
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    createKey(userId),
    ({ pageParam = undefined }) => getPosts(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 ? lastPage[9].id : undefined,
      ...options,
    }
  );
  return queryClient;
}

const createKey = (userId?: number) => ['posts', userId ?? 'all'];
useGetPostsQuery.createKey = createKey;
