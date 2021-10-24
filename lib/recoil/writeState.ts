import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

const syncLoadedState = atom<boolean>({
  key: 'syncLoadedState',
  default: false,
});

const isEditPostState = atom<boolean>({
  key: 'isEditPostState',
  default: false,
});

const existsTempPostState = atom<boolean>({
  key: 'existsTempData',
  default: false,
});

const loadTempPostState = atom<boolean>({
  key: 'loadTempPostState',
  default: false,
});

const postTitleState = atom<string | null>({
  key: 'postTitleState',
  default: null,
});

const postMarkdownState = atom<string | null>({
  key: 'postMarkdownState',
  default: null,
});

const postShortDescriptionState = atom<string | null>({
  key: 'postShortDescriptionState',
  default: null,
});

const postThumbnailUrlState = atom<string | null>({
  key: 'postThumbnailUrlState',
  default: null,
});

const visiblePublishScreen = atom<boolean>({
  key: 'visibleWriteScreen',
  default: false,
});

export function useResetAllState() {
  const resetPostTitle = useResetRecoilState(postTitleState);
  const resetPostMarkdown = useResetRecoilState(postMarkdownState);
  const resetPostShortDescription = useResetRecoilState(
    postShortDescriptionState
  );
  const resetPostThumbnailUrl = useResetRecoilState(postThumbnailUrlState);
  const resetSyncLoaded = useResetRecoilState(syncLoadedState);
  const resetVisiblePublishScreen = useResetRecoilState(visiblePublishScreen);
  const resetIsEditPostState = useResetRecoilState(isEditPostState);
  const resetExistsTempPost = useResetRecoilState(existsTempPostState);
  const resetLoadTempPost = useResetRecoilState(loadTempPostState);

  const reset = useCallback(() => {
    resetPostTitle();
    resetPostMarkdown();
    resetPostShortDescription();
    resetPostThumbnailUrl();
    resetSyncLoaded();
    resetVisiblePublishScreen();
    resetIsEditPostState();
    resetExistsTempPost();
    resetLoadTempPost();
  }, [
    resetPostTitle,
    resetPostMarkdown,
    resetPostShortDescription,
    resetPostThumbnailUrl,
    resetSyncLoaded,
    resetVisiblePublishScreen,
    resetIsEditPostState,
    resetExistsTempPost,
    resetLoadTempPost,
  ]);

  return reset;
}

export type PostAllContentType = {
  title: string | null;
  markdown: string | null;
  shortDescription: string | null;
  thumbnailUrl: string | null;
};

const postAllContent = selector<PostAllContentType>({
  key: '',
  get: ({ get }) => {
    const title = get(postTitleState);
    const markdown = get(postMarkdownState);
    const shortDescription = get(postShortDescriptionState);
    const thumbnailUrl = get(postThumbnailUrlState);

    return {
      title,
      markdown,
      shortDescription,
      thumbnailUrl,
    };
  },
});

export function usePostAllContentValue() {
  return useRecoilValue(postAllContent);
}

export function useSyncLoadedValue() {
  return useRecoilValue(syncLoadedState);
}

export function useIsEditPostValue() {
  return useRecoilValue(isEditPostState);
}

export function useSetIsEditPostState() {
  return useSetRecoilState(isEditPostState);
}

export function useExistsTempPostValue() {
  return useRecoilValue(existsTempPostState);
}

export function useSetExistsTempPost() {
  return useSetRecoilState(existsTempPostState);
}

export function useLoadTempPostValue() {
  return useRecoilValue(loadTempPostState);
}

export function useSetLoadTempPost() {
  return useSetRecoilState(loadTempPostState);
}

export function usePostTitleValue() {
  return useRecoilValue(postTitleState);
}

export function usePostTitleState() {
  return useRecoilState(postTitleState);
}

export function usePostMarkdownValue() {
  return useRecoilValue(postMarkdownState);
}

export function usePostThumbnailUrlState() {
  return useRecoilState(postThumbnailUrlState);
}

export function usePostThumbnailUrlValue() {
  return useRecoilValue(postThumbnailUrlState);
}

export function usePostShortDescriptionState() {
  return useRecoilState(postShortDescriptionState);
}

export function usePostShortDescriptionValue() {
  return useRecoilValue(postShortDescriptionState);
}

export function useVisiblePublishScreen() {
  return useRecoilValue(visiblePublishScreen);
}

export function useSetVisiblePublishScreen() {
  return useSetRecoilState(visiblePublishScreen);
}

export function useVisiblePublishScreenState() {
  return useRecoilState(visiblePublishScreen);
}

export function useSetPostAllContent() {
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostMarkdown = useSetRecoilState(postMarkdownState);
  const setPostShortDescription = useSetRecoilState(postShortDescriptionState);
  const setPostThumbnailUrl = useSetRecoilState(postThumbnailUrlState);
  const setIsEditPostState = useSetRecoilState(isEditPostState);

  const setSyncLoaded = useSetRecoilState(syncLoadedState);

  const set = useCallback(
    (post: PostAllContentType) => {
      setPostTitle(post.title);
      setPostMarkdown(post.markdown);
      setPostShortDescription(post.shortDescription);
      setPostThumbnailUrl(post.thumbnailUrl);
      setIsEditPostState(true);

      setSyncLoaded(true);
    },
    [
      setPostTitle,
      setPostMarkdown,
      setPostShortDescription,
      setPostThumbnailUrl,
      setIsEditPostState,
      setSyncLoaded,
    ]
  );
  return set;
}

export function useSetPublishPost() {
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostMarkdown = useSetRecoilState(postMarkdownState);
  const setPostShortDescription = useSetRecoilState(postShortDescriptionState);
  const setPostThumbnailUrl = useSetRecoilState(postThumbnailUrlState);

  const set = useCallback(
    (post: PostAllContentType) => {
      setPostTitle(post.title);
      setPostMarkdown(post.markdown);
      setPostShortDescription(post.shortDescription);
      setPostThumbnailUrl(post.thumbnailUrl);
    },
    [
      setPostTitle,
      setPostMarkdown,
      setPostShortDescription,
      setPostThumbnailUrl,
    ]
  );
  return set;
}
