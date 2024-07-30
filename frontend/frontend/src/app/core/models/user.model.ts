import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { UserManagementComponent } from '../../user/user-management/user-management.component';
import { CreateUserComponent } from '../../user/create-user/create-user.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule  // Add FormsModule to imports
  ]
})
export class UserModule { }
