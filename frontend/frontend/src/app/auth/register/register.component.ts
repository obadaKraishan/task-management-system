// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  role: string = '';
  department: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.name, this.email, this.password, this.phone, this.role, this.department).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.successMessage = 'Registration successful!';
        setTimeout(() => {
          this.router.navigate(['/projects']);
        }, 2000); // Redirect after 2 seconds
      },
      (err) => {
        this.errorMessage = 'Error registering: ' + (err.error.msg || err.message);
        console.error('Error registering', err);
      }
    );
  }
}
