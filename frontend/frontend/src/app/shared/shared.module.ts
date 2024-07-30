import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    NavbarComponent,
    AutofocusDirective,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
