import { useMutation } from 'react-query';
import saveNewPost from '@/lib/api/posts/saveNewPost';
import saveNewTempPost from '@/lib/api/posts/saveNewTempPost';
import saveTempPost from '@/lib/api/posts/saveTempPost';
import updatePost from '@/lib/api/posts/updatePost';
import { PostAllContentType } from '@/lib/recoil/writeState';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSetScreenLoadingState } from '@/lib/recoil/appState';

export default function useSavePost() {
  const router = useRouter();
  const setScreenLoading = useSetScreenLoadingState();

  const postMutation = useMutation(
    ({ slug, post }: { slug?: string; post: PostAllContentType }) =>
      slug ? updatePost(slug, post) : saveNewPost(post)
  );

  const tempPostMutation = useMutation(
    async ({ slug, post }: { slug?: string; post: PostAllContentType }) => {
      const saved = slug
        ? await saveTempPost(slug, post)
        : await saveNewTempPost(post);
      router.replace(`/write/${saved.url_slug}`);
    }
  );

  const loading = useMemo(() => {
    return postMutation.isLoading || tempPostMutation.isLoading;
  }, [postMutation.isLoading, tempPostMutation.isLoading]);

  const error = useMemo(() => {
    return postMutation.error ?? tempPostMutation.error;
  }, [postMutation.error, tempPostMutation.error]);

  useEffect(() => {
    setScreenLoading(loading);
  }, [loading, setScreenLoading]);

  return {
    savePost: postMutation.mutateAsync,
    saveTempPost: tempPostMutation.mutateAsync,
    loading,
    error,
  };
}
