import jwt_decode from 'jwt-decode';
import { Credentials, TokenUser } from 'types';
import User from './User';

class TokenHandler {
  private storage: Storage = sessionStorage;

  getAccess(): string | null {
    return this.storage.getItem('access');
  }

  getRefresh(): string | null {
    return this.storage.getItem('refresh');
  }

  setAccess(token: string): void {
    this.storage.setItem('access', token);
  }

  setRefresh(token: string): void {
    this.storage.setItem('refresh', token);
  }

  get(): Credentials | null {
    const access = this.getAccess();
    const refresh = this.getRefresh();
    return (access && refresh) ? { access, refresh } : null;
  }

  getUser(): User | null {
    const access = this.getAccess();
    const decodedToken = access ? jwt_decode<TokenUser>(access) : null;
    return decodedToken ? new User(decodedToken) : null;
  }

  set({ access, refresh }: Credentials): void {
    this.setAccess(access);
    this.setRefresh(refresh);
  }

  delete(): void {
    this.storage.removeItem('access');
    this.storage.removeItem('refresh');
  }
}

const instance = new TokenHandler();

export default instance;
