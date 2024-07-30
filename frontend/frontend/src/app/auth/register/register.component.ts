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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.name, this.email, this.password).subscribe(
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
