import { MutableSnapshot } from 'recoil';
import userStorage from '../storage/userStorage';
import { userState } from './authState';

// not use
export default function initialize({ set }: MutableSnapshot) {
  const user = userStorage.get();

  if (user) {
    set(userState, user);
  }
}
