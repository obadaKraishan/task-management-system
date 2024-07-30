import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
