import client from '../client';

export default async function logout() {
  const response = await client.post('/api/auth/logout');

  return response.data;
}
