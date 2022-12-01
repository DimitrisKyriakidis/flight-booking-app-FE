import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { HomePageComponent } from './home-page.component';

const routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
