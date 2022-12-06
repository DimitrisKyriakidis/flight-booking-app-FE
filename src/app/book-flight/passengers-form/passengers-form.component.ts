import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
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
    };
    this.passengersForm = this.fb.group({
      passengers: this.fb.array([this.createPassengersFormArray()]),
    });
    for (let i = 0; i < this.filters['passengers']; i++) {
      this.passengers.push(this.createPassengersFormArray());
    }
    console.log(this.passengersForm);
  }

  createPassengersFormArray() {
    return this.fb.group({
      firstName: [],
      lastName: [],
      gender: [],
      birthDate: [],
    });
  }
  get passengers() {
    return this.passengersForm.get('passengers')['controls'] as FormArray;
  }
  // add() {
  //   this.passengers.push(this.createPassengersFormArray());
  // }
}
