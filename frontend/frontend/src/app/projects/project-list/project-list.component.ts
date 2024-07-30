import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
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
}
