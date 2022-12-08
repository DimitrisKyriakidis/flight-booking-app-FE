import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { FlightResultsComponent } from '../flight-results/flight-results.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { BookFlightComponent } from './book-flight.component';
import { PassengersFormComponent } from './passengers-form/passengers-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes = [
  { path: '', component: BookFlightComponent },
  { path: 'passengers-form', component: PassengersFormComponent },
  { path: 'payment-form', component: PaymentFormComponent },
];

@NgModule({
  declarations: [
    BookFlightComponent,
    PassengersFormComponent,
    PaymentFormComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    BreadcrumbModule,
  ],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class BookFlightModule {}
