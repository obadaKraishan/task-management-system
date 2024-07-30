import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [NavbarComponent, AutofocusDirective],
  imports: [CommonModule],
  exports: [NavbarComponent, AutofocusDirective]
})
export class SharedModule {}
