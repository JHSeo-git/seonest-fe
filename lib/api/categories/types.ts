import { Post } from '../posts/types';

export type Category = {
  id: number;
  name: string;
  url_slug: string;
  created_at: string;
  updated_at: string;
  posts?: Post[];
};

export type RawCategory = {
  category_id: number;
  category_name: string;
  category_url_slug: string;
  category_created_at: string;
  category_updated_at: string;
  category_user_id: number;
  post_id: number;
  post_title: string;
  post_body: string;
  post_short_description: string | null;
  post_thumbnail: string | null;
  post_url_slug: string;
  post_is_temp: boolean;
  post_read_time?: number;
  post_created_at: string;
  post_updated_at: string;
  post_user_id: number;
  post_read_count?: number;
  user_id: number;
  user_email: string;
  user_display_name: string;
  user_photo_url: string | null;
  user_is_admin: boolean;
  user_created_at: string;
  user_updated_at: string;
};
