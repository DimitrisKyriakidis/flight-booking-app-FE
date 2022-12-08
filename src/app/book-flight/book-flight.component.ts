import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FlightsActionTypes } from '../Store/flights-store/flights-actions';
import { PassengersFormComponent } from './passengers-form/passengers-form.component';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit, AfterViewInit {
  @ViewChild('step1', { static: false })
  step1: PassengersFormComponent;

  constructor(
    private store: Store,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  saveFlight(paymentForm: FormGroup) {
    if (paymentForm.valid) {
      let filters = this.step1['filters'];

      let passengersFormValue =
        this.step1.passengersForm.get('passengers')['controls'];

      let newForm = [];
      passengersFormValue.forEach((element) => {
        newForm.push(element.value);
      });
      const flight = { filters: filters, passengers: newForm };

      this.store.dispatch({
        type: FlightsActionTypes.saveFlight,
        flight: flight,
      });
    }
  }
}
