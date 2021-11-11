import { Post } from '../posts/types';

export type Category = {
  id: number;
  name: string;
  url_slug: string;
  created_at: string;
  updated_at: string;
  posts?: Post[];
};
