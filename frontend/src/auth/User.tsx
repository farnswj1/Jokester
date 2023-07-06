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
    this.id = props.id;
    this.username = props.username;
    this.is_staff = props.is_staff;
    this.token_type = props.token_type;
    this.iat = props.iat;
    this.exp = props.exp;
    this.jti = props.jti;
    this.groups = props.groups;
  }

  hasGroup(group: string) {
    return this.groups.includes(group);
  }

  hasGroups(groups: string[]) {
    const groupSet = new Set(groups);

    for (const group of this.groups) {
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
