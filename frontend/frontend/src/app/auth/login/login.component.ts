// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        if (this.rememberMe) {
          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
        this.router.navigate(['/projects']);
      },
      (err) => {
        this.snackBar.open('Error logging in', 'Close', { duration: 3000 });
        console.error('Error logging in', err);
      }
    );
  }
}
