import client from '../client';
import { User } from './types';

type GoogleLoginPayload = {
  token: string;
  adminMode: boolean;
};

export default async function googleLogin({
  token,
  adminMode,
}: GoogleLoginPayload) {
  const response = await client.post<GoogleSigninResult>(
    '/api/auth/google/login',
    {
      access_token: token,
      admin_mode: adminMode,
    }
  );

  return response.data;
}

export type GoogleSigninResult = {
  user: User;
  access_token: string;
};
