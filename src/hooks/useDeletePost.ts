import deletePostBySlug from '@/helpers/api/posts/deletePostBySlug';
import { useSetScreenLoadingState } from '@/helpers/recoil/appState';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function useDeletePost() {
  const setScreenLoading = useSetScreenLoadingState();

  const { isLoading: loading, mutateAsync } = useMutation(
    async (slug: string) => {
      await deletePostBySlug(slug);
    }
  );

  useEffect(() => {
    setScreenLoading(loading);
  }, [loading, setScreenLoading]);

  return {
    deletePost: mutateAsync,
  };
}
