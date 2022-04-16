import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const screenLoadingState = atom<boolean>({
  key: 'screenLoadingState',
  default: false,
});

export function useScreenLoadingState() {
  return useRecoilState(screenLoadingState);
}

export function useSetScreenLoadingState() {
  return useSetRecoilState(screenLoadingState);
}

export function useScreenLoadingValue() {
  return useRecoilValue(screenLoadingState);
}
