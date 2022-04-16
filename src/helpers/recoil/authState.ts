import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { User } from '../api/auth/types';

export const googleTokenState = atom<string | null>({
  key: 'googleTokenState',
  default: null,
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export function useGoogleTokenState() {
  return useRecoilState(googleTokenState);
}

export function useSetGoogleToken() {
  return useSetRecoilState(googleTokenState);
}

export function useUserState() {
  return useRecoilState(userState);
}

export function useSetUser() {
  return useSetRecoilState(userState);
}

export function useUserValue() {
  return useRecoilValue(userState);
}
