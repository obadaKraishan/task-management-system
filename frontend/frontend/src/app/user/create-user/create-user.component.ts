import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  role: string = '';
  department: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.createUser(this.name, this.email, this.password, this.phone, this.role, this.department).subscribe(
      res => {
        console.log('User created successfully');
        this.router.navigate(['/user-management']);
      },
      err => {
        console.error('Error creating user', err);
      }
    );
  }
}
