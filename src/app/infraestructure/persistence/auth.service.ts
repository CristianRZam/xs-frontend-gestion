import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private jwtHelper = new JwtHelperService();

  constructor(private localStorage: LocalStorageService) {}

  setToken(token: string): void {
    this.localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    this.localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getPermissions(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const decoded = this.jwtHelper.decodeToken<{ permissions: string[] }>(token);
    return decoded?.permissions || [];
  }
}
