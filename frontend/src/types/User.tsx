export interface TokenUser {
  id: string;
  username: string;
  is_staff: boolean;
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  groups: string[];
}

export interface IUser extends TokenUser {
  hasGroup(group: string): boolean;
  hasGroups(groups: string[]): boolean;
  hasAnyGroup(groups: string[]): boolean;
}

export interface BaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserProfile extends BaseUser {
  username: string;
  date_joined: string;
}

export interface BaseUserName {
  id: string;
  username: string;
}
