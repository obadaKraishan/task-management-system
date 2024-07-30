import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    const newUser: User = { id: '', name: this.name, email: this.email, password: this.password };
    this.authService.register(newUser).subscribe(
      (res) => {
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        localStorage.setItem('token', res.token);
        this.router.navigate(['/projects']);
      },
      (err) => {
        this.snackBar.open('Error registering', 'Close', { duration: 3000 });
        console.error('Error registering:', err);
      }
    );
  }
}
