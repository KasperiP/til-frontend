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
  description: string;
  tags: string[];
  postCreatedAt: Date;
  userId: number;
  name: string;
  image: string;
  likes: number;
  readTime: number;
}

export interface ApiStatistics {
  userPosts: number;
  userLikes: number;
  userStreak: number;
  totalPosts: number;
  postsLastWeek: number;
}

export interface ApiFullPost extends ApiPreviewPost {
  content: string;
}

export type ApiPost = ApiPreviewPost;

export interface ApiPreviewPosts {
  posts: ApiPreviewPost[];
  hasMore: boolean;
}
