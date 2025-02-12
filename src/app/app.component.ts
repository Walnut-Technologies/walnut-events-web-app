import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  title = 'Events App';

  showHeader() {
    return this.router.url !== '/login';
  }

  logout() {
    this.authService.logout();
  }
}
