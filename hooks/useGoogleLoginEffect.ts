import { RefObject, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetGoogleToken } from '@/lib/recoil/authState';
import googleLogin from '@/lib/api/auth/googleLogin';
import useAuthManage from './useAuthManage';

export default function useGoogleLoginEffect(
  ref: RefObject<Element>,
  dependancy = false
) {
  const router = useRouter();
  const setGoogleToken = useSetGoogleToken();
  const { loggedIn } = useAuthManage();

  const login = useCallback(
    async (accessToken: string, adminMode: boolean = false) => {
      setGoogleToken(accessToken);
      try {
        const { user } = await googleLogin({ token: accessToken, adminMode });
        loggedIn(user);
      } catch (e) {}
    },
    [setGoogleToken, loggedIn]
  );

  const onSuccess = useCallback(
    (googleUser: any) => {
      login(googleUser?.getAuthResponse(true).access_token, true).then(() => {
        router.push('/');
      });
    },
    [login, router]
  );

  const onFailure = useCallback((e: any) => {
    toast.error(`Failed Google Login: ${e}`);
  }, []);

  useEffect(() => {
    if (!window?.gapi) return;

    window.gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = window.gapi.auth2.init({
        client_id:
          '581628041764-0vigicm4si1kdn1bnobgj5onnpg1o2qm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      auth2.attachClickHandler(ref.current, {}, (googleUser: any) => {
        onSuccess(googleUser);
      });
      // attachSignin(document.getElementById('customBtn'));
    });
  }, [ref, onSuccess, onFailure, dependancy]);
}
