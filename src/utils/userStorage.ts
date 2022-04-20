import SecureLS from 'secure-ls';
import { User } from '@/helpers/api/auth/types';

let ls: SecureLS | null = null;
const init = () => {
  ls = new SecureLS({ encodingType: 'aes' });
};
if (global?.localStorage) init();

const key = '__NEXT_SEONSET_USER__';

const userStorage = {
  get() {
    if (!ls) {
      return null;
    }

    const data = ls.get(key);
    try {
      if (!data) return null;
      const parsed = JSON.parse(data) as User;
      return parsed;
    } catch (e) {
      ls.remove(key);
      return null;
    }
  },
  set(user: User) {
    if (!ls) {
      return null;
    }

    ls.set(key, JSON.stringify(user));
  },
  clear() {
    if (!ls) {
      return null;
    }

    ls.remove(key);
  },
  clearAll() {
    if (!ls) {
      return null;
    }

    ls.removeAll();
  },
};

export default userStorage;
