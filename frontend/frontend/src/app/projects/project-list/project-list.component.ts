// src/app/projects/project-list/project-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  users: any[] = [];
  newProject: any = {
    title: '',
    description: '',
    duration: 0,
    deadline: '',
    team: [],
    tasks: []
  };
  newUser: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    department: ''
  };
  isManagerOrTeamLeader: boolean = false;
  currentUser: any = {};

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadProjects();
    this.loadUsers();
  }

  checkUserRole(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUser = currentUser;
      this.isManagerOrTeamLeader = currentUser.role === 'Manager' || currentUser.role === 'Team Leader';
    }
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  openAddProjectModal(): void {
    const addProjectModal: any = document.getElementById('addProjectModal');
    addProjectModal.classList.add('show');
    addProjectModal.style.display = 'block';
  }

  closeAddProjectModal(): void {
    const addProjectModal: any = document.getElementById('addProjectModal');
    addProjectModal.classList.remove('show');
    addProjectModal.style.display = 'none';
  }

  openEditProjectModal(project: any): void {
    console.log('Edit project:', project);
    // Implement logic to open edit modal and populate it with project data
  }

  addProject(): void {
    this.projectService.createProject(this.newProject).subscribe(
      (project) => {
        console.log('Project added successfully', project);
        this.closeAddProjectModal();
        this.loadProjects();
        this.snackBar.open('Project added successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error adding project', error);
        this.snackBar.open('Error adding project.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  deleteProject(projectId: string): void {
    this.projectService.deleteProject(projectId).subscribe(
      () => {
        this.projects = this.projects.filter(project => project._id !== projectId);
        this.snackBar.open('Project deleted successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error deleting project', error);
        this.snackBar.open('Error deleting project.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  openAddUserModal(): void {
    const addUserModal: any = document.getElementById('addUserModal');
    addUserModal.classList.add('show');
    addUserModal.style.display = 'block';
  }

  closeAddUserModal(): void {
    const addUserModal: any = document.getElementById('addUserModal');
    addUserModal.classList.remove('show');
    addUserModal.style.display = 'none';
  }

  addUser(): void {
    this.authService.createUser(
      this.newUser.name,
      this.newUser.email,
      this.newUser.password,
      this.newUser.phone,
      this.newUser.role,
      this.newUser.department
    ).subscribe(
      (user) => {
        console.log('User added successfully', user);
        this.closeAddUserModal();
        this.loadUsers();
        this.snackBar.open('User added successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error adding user', error);
        this.snackBar.open('Error adding user.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  editUser(user: any): void {
    // Implement user edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(userId: string): void {
    // Implement user delete functionality
    console.log('Delete user with ID:', userId);
  }
}
