import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectsModule { }
