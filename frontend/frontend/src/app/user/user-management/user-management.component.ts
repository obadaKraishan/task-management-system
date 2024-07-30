import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  showCreateUser: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  showCreateUserModal(): void {
    this.showCreateUser = true;
  }

  editUser(user: any): void {
    // Implement user edit functionality
  }

  deleteUser(userId: string): void {
    // Implement user delete functionality
  }
}
