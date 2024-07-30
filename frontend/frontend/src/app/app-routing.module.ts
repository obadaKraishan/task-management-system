import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
