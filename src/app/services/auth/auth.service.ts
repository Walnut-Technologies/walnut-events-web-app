import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private userAuthenticated = signal<boolean>(false);

  constructor() { }

  login(username: string, password: string) {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('token', 'fake-jwt-token');
      this.userAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.userAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
