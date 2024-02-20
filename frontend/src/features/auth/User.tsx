import { IUser, TokenUser } from 'types';

export default class User implements IUser {
  id: string;
  username: string;
  is_staff: boolean;
  token_type: string;
  iat: number;
  exp: number;
  jti: string;
  groups: string[];

  constructor(props: TokenUser) {
    const {
      id,
      username,
      is_staff,
      token_type,
      iat,
      exp,
      jti,
      groups
    } = props;

    this.id = id;
    this.username = username;
    this.is_staff = is_staff;
    this.token_type = token_type;
    this.iat = iat;
    this.exp = exp;
    this.jti = jti;
    this.groups = groups;
  }

  hasGroup(group: string) {
    return this.groups.includes(group);
  }

  hasGroups(groups: string[]) {
    const groupSet = new Set(this.groups);

    for (const group of groups) {
      if (!groupSet.has(group)) {
        return false;
      }
    }

    return true;
  }

  hasAnyGroup(groups: string[]) {
    const groupSet = new Set(groups);

    for (const group of this.groups) {
      if (groupSet.has(group)) {
        return true;
      }
    }

    return false;
  }
}
