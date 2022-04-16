import { useSetUser } from '@/lib/recoil/authState';
import userStorage from '@/lib/storage/userStorage';
import { useEffect } from 'react';

export default function useAppInitializeEffect() {
  const setUser = useSetUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = userStorage.get();
      setUser(user);
    }
  }, [setUser]);
}
