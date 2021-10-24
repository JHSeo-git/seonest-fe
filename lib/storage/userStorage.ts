import { User } from '../api/auth/types';

const key = '__NEXT__CATCH_A_NEST_USER';

const userStorage = {
  get() {
    const data = localStorage.getItem(key);
    try {
      if (!data) return null;
      const parsed = JSON.parse(data) as User;
      return parsed;
    } catch (e) {
      localStorage.removeItem(key);
      return null;
    }
  },
  set(user: User) {
    localStorage.setItem(key, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(key);
  },
};

export default userStorage;
