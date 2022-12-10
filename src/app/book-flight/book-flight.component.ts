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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FlightsActionTypes } from '../Store/flights-store/flights-actions';
import { selectLoader } from '../Store/flights-store/flights.selector';
import { PassengersFormComponent } from './passengers-form/passengers-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit, AfterViewInit {
  @ViewChild('step1', { static: false })
  step1: PassengersFormComponent;

  loading: boolean;

  constructor(
    private store: Store,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  saveFlight(paymentForm: FormGroup) {
    if (paymentForm.valid) {
      this.loading = true;
      const filters = this.step1['filters'];

      let passengersFormValue =
        this.step1.passengersForm.get('passengers')['controls'];

      const newForm = [];

      passengersFormValue.forEach((element) => {
        newForm.push(element.value);
      });
      const flight = { filters: filters, passengers: newForm };

      this.store.dispatch({
        type: FlightsActionTypes.saveFlight,
        flight: flight,
      });

      setTimeout(() => {
        this.loading = false;
      }, 3000);

      this.successMessage();
    }
  }

  successMessage() {
    this.snackBar.open('Flight ticket has been booked successfully', 'X', {
      duration: 6000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbarClass'],
    });
  }
}
