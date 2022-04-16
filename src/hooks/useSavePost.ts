import { useMutation } from 'react-query';
import saveNewPost from '@/helpers/api/posts/saveNewPost';
import saveNewTempPost from '@/helpers/api/posts/saveNewTempPost';
import saveTempPost from '@/helpers/api/posts/saveTempPost';
import updatePost from '@/helpers/api/posts/updatePost';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSetScreenLoadingState } from '@/helpers/recoil/appState';
import { PostAllContentType } from '@/helpers/types/types';

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
