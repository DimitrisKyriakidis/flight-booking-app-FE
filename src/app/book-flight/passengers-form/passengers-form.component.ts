import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passengers-form',
  templateUrl: './passengers-form.component.html',
  styleUrls: ['./passengers-form.component.css'],
})
export class PassengersFormComponent implements OnInit {
  passengersForm: FormGroup;

  filters = {};
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filters = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      from: this.activatedRoute.snapshot.paramMap.get('from'),
      to: this.activatedRoute.snapshot.paramMap.get('to'),
      dateFrom: this.activatedRoute.snapshot.paramMap.get('dateFrom'),
      dateTo: this.activatedRoute.snapshot.paramMap.get('dateTo'),
      seatType: this.activatedRoute.snapshot.paramMap.get('seatType'),
      passengers: Number(
        this.activatedRoute.snapshot.paramMap.get('passengers')
      ),
      price: Number(this.activatedRoute.snapshot.paramMap.get('price')),
    };

    this.passengersForm = this.fb.group({
      passengers: this.fb.array([this.createPassengersFormArray()]),
    });

    for (let i = 1; i < this.filters['passengers']; i++) {
      this.passengers.push(this.createPassengersFormArray());
    }
  }

  createPassengersFormArray() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  get passengers() {
    return this.passengersForm.get('passengers') as FormArray;
  }
}
