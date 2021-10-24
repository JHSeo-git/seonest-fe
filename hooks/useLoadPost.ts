import {
  useSetExistsTempPost,
  useSetPostAllContent,
  useSyncLoadedValue,
  useLoadTempPostValue,
} from '@/lib/recoil/writeState';
import { useEffect, useMemo } from 'react';
import useGetLastTempPostBySlugQuery from './query/useGetLastTempPostBySlugQuery';
import useGetPostBySlugQuery from './query/useGetPostBySlugQuery';

export default function useLoadPost(slug: string) {
  const loaded = useSyncLoadedValue();
  const set = useSetPostAllContent();
  const loadTempPost = useLoadTempPostValue();
  const setExistsTempPost = useSetExistsTempPost();
  const postQuery = useGetPostBySlugQuery(slug, {
    refetchOnWindowFocus: false,
    retry: 3,
  });
  const lastTempPostQuery = useGetLastTempPostBySlugQuery(slug, {
    refetchOnWindowFocus: false,
    retry: 3,
    cacheTime: 0,
  });

  const loading = useMemo(() => {
    return postQuery.isLoading || lastTempPostQuery.isLoading;
  }, [postQuery.isLoading, lastTempPostQuery.isLoading]);

  const error = useMemo(() => {
    return postQuery.error ?? lastTempPostQuery.error;
  }, [postQuery.error, lastTempPostQuery.error]);

  const post = useMemo(() => {
    if (loadTempPost) return lastTempPostQuery.data;
    return postQuery.data;
  }, [loadTempPost, postQuery.data, lastTempPostQuery.data]);

  // check exists tempPost
  useEffect(() => {
    if (!postQuery.data) return;
    if (!lastTempPostQuery.data) return;
    if (postQuery.data.is_temp) return;

    setExistsTempPost(true);
  }, [postQuery.data, lastTempPostQuery.data, setExistsTempPost]);

  // sync post api data to recoil
  useEffect(() => {
    if (loading) return;
    if (!post) return;

    set({
      title: post.title,
      markdown: post.body,
      shortDescription: post.short_description,
      thumbnailUrl: post.thumbnail,
    });
  }, [post, set, loading]);

  return {
    loaded,
    error,
  };
}
