import getMe from '@/helpers/api/auth/getMe';
import { useQuery, UseQueryOptions } from 'react-query';
import type { User } from '@/helpers/api/auth/types';

type QueryOption =
  | Omit<UseQueryOptions<User, unknown, User, string[]>, 'queryKey' | 'queryFn'>
  | undefined;

export default function useGetMeQuery(options: QueryOption = {}) {
  const mergedOption: QueryOption = {
    ...options,
    cacheTime: 0,
  };

  return useQuery(createKey(), () => getMe(), mergedOption);
}

const createKey = () => ['me'];
useGetMeQuery.createKey = createKey;
