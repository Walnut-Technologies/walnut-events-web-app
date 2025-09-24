
import { Component, computed, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  auth = inject(AuthService);
  router = inject(Router);

  isLoggedIn = computed(() => this.auth.isAuthenticated());
  roles = computed(() => this.auth.getRoles());

  get userName(): string {
    return 'Usuario';
  }

  logout() {
    this.auth.logout();
  }
}
