import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface AuthResponse {
  token: string;
  refreshToken?: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root'})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private userAuthenticated = signal<boolean>(false);

  constructor() {
     if (this.isBrowser() && !!localStorage.getItem('token')) {
      this.userAuthenticated.set(true);
    }
   }

    private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(username: string, password: string) {
  return this.http.post<any>('https://invitemx.azurewebsites.net/api/auth/login', {
      username,password
    });
  }

setSession(auth: { token: string; refreshToken?: string; roles?: string[] }) {
    if (!this.isBrowser()) return;                 // evita romper en SSR
    localStorage.setItem('token', auth.token);
    if (auth.refreshToken) localStorage.setItem('refreshToken', auth.refreshToken);
    if (auth.roles) localStorage.setItem('roles', JSON.stringify(auth.roles));
    this.userAuthenticated.set(true);
  }

    getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

     logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('roles');
    }
    this.userAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
  
   isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('token');
  }

   getRoles(): string[] {
    if (!this.isBrowser()) return [];
    try { return JSON.parse(localStorage.getItem('roles') || '[]'); }
    catch { return []; }
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
}
