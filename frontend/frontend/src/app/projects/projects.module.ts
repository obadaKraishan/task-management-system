import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add this
  ],
  exports: [
    ProjectListComponent,
    ProjectDetailsComponent
  ]
})
export class ProjectsModule { }
