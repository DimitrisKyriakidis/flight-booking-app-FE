import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [AngularMaterialModule, CommonModule, BreadcrumbModule],
  exports: [NavbarComponent, FooterComponent, BreadcrumbModule],
})
export class SharedModule {}
