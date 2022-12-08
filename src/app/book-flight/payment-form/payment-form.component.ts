import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      cardName: new FormControl(null, [Validators.required]),
      carNumber: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      cvc: new FormControl(null, [Validators.required]),
    });
  }
}
