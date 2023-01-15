import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
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
  ],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class BookFlightModule {}
