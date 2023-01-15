import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [AngularMaterialModule, CommonModule],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule {}
