import { Post } from '../../../core/models/api.model';

export type Posts = Post & { hasNext: boolean };
