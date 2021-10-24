import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const tocHeadingIdState = atom<string | null>({
  key: 'tocHeadingIdState',
  default: null,
});

const viewerHeadingIdsState = atom<string[]>({
  key: 'viewerHeadingIdsState',
  default: [],
});

export function useTOCHeadingIdValue() {
  return useRecoilValue(tocHeadingIdState);
}

export function useSetTOCHeadingId() {
  return useSetRecoilState(tocHeadingIdState);
}

export function useViewerHeadingIdsState() {
  return useRecoilValue(viewerHeadingIdsState);
}

export function useSetViewerHeadingIds() {
  return useSetRecoilState(viewerHeadingIdsState);
}
