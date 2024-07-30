import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
