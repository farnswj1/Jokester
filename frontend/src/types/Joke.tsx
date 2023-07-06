import { BaseUserName, UserProfile } from './User';

export interface BaseJoke {
  id: string
  title: string
  author: BaseUserName
}

export interface Joke extends BaseJoke {
  author: UserProfile
  body: string
}
