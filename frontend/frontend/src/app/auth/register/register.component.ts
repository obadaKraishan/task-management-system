import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const newUser: User = { id: '', name: this.name, email: this.email, password: this.password };
    this.authService.register(newUser).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/projects']);
      },
      (err) => {
        console.error('Error registering', err);
      }
    );
  }
}
