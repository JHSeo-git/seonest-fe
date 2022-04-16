import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const client = axios.create();

// test : ec2-54-180-96-175.ap-northeast-2.compute.amazonaws.com
client.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.seonest.net'
    : 'http://localhost:5001';
client.defaults.withCredentials = true;
client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      toast.error(error.message);
      if (error.response.status === 401) {
        // TODO: auth 에러 일 경우 logout 처리?
      }
    }
    return Promise.reject(error);
  }
);

export default client;
