import getPostBySlug from "@/lib/api/posts/getPostBySlug";
import { Post } from "@/lib/api/posts/types";
import { QueryClient, useQuery, UseQueryOptions } from "react-query";

export default function useGetPostBySlugQuery(
  slug: string,
  options:
    | Omit<
        UseQueryOptions<Post, unknown, Post, string[]>,
        "queryKey" | "queryFn"
      >
    | undefined = {}
) {
  return useQuery(createKey(slug), () => getPostBySlug(slug), options);
}

export async function prefetchGetPostBySlugQuery(
  slug: string,
  options: UseQueryOptions<Post, unknown, Post> = {}
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    createKey(slug),
    () => getPostBySlug(slug),
    options
  );
  return queryClient;
}

const createKey = (slug: string) => ["post", slug];
useGetPostBySlugQuery.createKey = createKey;
