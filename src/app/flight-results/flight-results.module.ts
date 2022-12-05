import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FlightResultsComponent } from './flight-results.component';

const routes = [{ path: '', component: FlightResultsComponent }];

@NgModule({
  declarations: [FlightResultsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class FlightResultsModule {}
