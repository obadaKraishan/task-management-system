import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AutofocusDirective } from './autofocus.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
