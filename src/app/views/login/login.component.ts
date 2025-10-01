import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorMsg = '';
  loading = false;
  showPass = false;
  returnUrl = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {
    const route = inject(ActivatedRoute);
    this.returnUrl = route.snapshot.queryParamMap.get('returnUrl') || '/home';
    this.loginForm.valueChanges.subscribe(() => { this.errorMsg = ''; });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.loading = true;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          this.authService.setSession(res);
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Usuario o contraseña incorrectos';
          this.loading = false;
        }
      });
    }
  }
}
