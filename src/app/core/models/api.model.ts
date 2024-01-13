import { SupportedOauthProviders } from './auth.model';

export interface ApiError<T = void> {
  code: string;
  message?: string;
  isError: boolean;
  data?: T;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  image: string;
  authType: SupportedOauthProviders;
  createdAt: Date;
}

export interface ApiPreviewPost {
  postId: number;
  title: string;
  content: string;
  tags: string[];
  postCreatedAt: Date;
  userId: number;
  name: string;
  email: string;
  image: string;
  authType: SupportedOauthProviders;
  authId: string;
  userCreatedAt: Date;
}

export type ApiPost = ApiPreviewPost;

export interface ApiPreviewPosts {
  posts: ApiPreviewPost[];
  hasMore: boolean;
}
