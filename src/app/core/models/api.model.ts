import { SupportedOauthProviders } from './auth.model';

export interface ApiResponse<T = void> {
  status: number;
  code: string;
  isError: boolean;
  message?: string;
  data?: T;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  authType: SupportedOauthProviders;
  createdAt: Date;
}

export interface Post extends User {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PostPreview {
  posts: Post[];
  hasNext: boolean;
}
