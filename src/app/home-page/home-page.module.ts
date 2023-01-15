import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { FlightResultsComponent } from '../flight-results/flight-results.component';

import { HomePageComponent } from './home-page.component';

const routes = [
  { path: '', component: HomePageComponent },
  { path: 'filter-form', component: FilterFormComponent },
  {
    path: 'flight-results/:from/:to/:dateFrom/:dateTo/:seatType/:passengers',
    component: FlightResultsComponent,
  },

  // { path: 'flight-results', component: FlightResultsComponent },
];

@NgModule({
  declarations: [
    HomePageComponent,
    FilterFormComponent,
    FlightResultsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class HomePageModule {}
