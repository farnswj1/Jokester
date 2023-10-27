import { BaseUserName } from './User';

export interface BaseJoke {
  id: string;
  title: string;
  author: BaseUserName;
}

export interface Joke extends BaseJoke {
  body: string;
  total_likes: number;
  liked_by?: boolean;
}
