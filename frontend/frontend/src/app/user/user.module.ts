import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
