import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
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

  addProject(): void {
    // Logic to add a new project
    console.log('Add Project button clicked');
  }

  deleteProject(projectId: string): void {
    this.projectService.deleteProject(projectId).subscribe(
      () => {
        this.projects = this.projects.filter(project => project.id !== projectId);
      },
      (error) => {
        console.error('Error deleting project', error);
      }
    );
  }
}
