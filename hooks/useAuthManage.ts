import { toast } from 'react-toastify';
import { User } from '@/lib/api/auth/types';
import { useSetUser } from '@/lib/recoil/authState';
import userStorage from '@/lib/storage/userStorage';
import logout from '@/lib/api/auth/logout';

export default function useAuthManage() {
  const setUser = useSetUser();
  // const { notify } = useAppToast();

  const loggedIn = (user: User) => {
    setUser(user);
    userStorage.set(user);

    toast.info('👑 Welcome! My Lord!');
  };

  const loggedout = async () => {
    setUser(null);
    userStorage.clear();
    try {
      if (window.gapi?.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
      }
    } catch (e) {
      toast.error(`Logout Error: ${e}`);
    }

    try {
      const result = await logout();
    } catch (e) {
      console.error(e);
    }

    toast.info('🙇‍♂️ See you soon! My Lord!');
  };

  return {
    loggedIn,
    loggedout,
  };
}
