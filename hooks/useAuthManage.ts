import { toast } from 'react-toastify';
import { User } from '@/lib/api/auth/types';
import { useSetUser } from '@/lib/recoil/authState';
import userStorage from '@/lib/storage/userStorage';

export default function useAuthManage() {
  const setUser = useSetUser();
  // const { notify } = useAppToast();

  const loggedIn = (user: User) => {
    setUser(user);
    userStorage.set(user);

    toast.info('👑 Welcome! My Lord!');
  };

  const logout = () => {
    setUser(null);
    userStorage.clear();
    try {
      if (window.gapi?.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
      }

      toast.info('🙇‍♂️ See you soon! My Lord!');
    } catch (e) {
      toast.error(`Logout Error: ${e}`);
    }
  };

  return {
    loggedIn,
    logout,
  };
}
