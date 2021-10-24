import client from '../client';
import { User } from './types';

export default async function getMe() {
  const response = await client.get<User>('/api/me');

  return response.data;
}
