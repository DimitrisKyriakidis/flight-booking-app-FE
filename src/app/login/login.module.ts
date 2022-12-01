import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { SharedModule } from '../shared/modules/shared.module';
import { LoginService } from '../services/login.service';

export const routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  exports: [RouterModule],
  providers: [LoginService],
})
export class LoginModule {}
