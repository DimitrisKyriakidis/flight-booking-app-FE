import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { selectUser } from '../Store/login-store/login.selector';
import { login } from '../Store/login-store/login.actions';
import { getAllFlights } from '../Store/flights-store/flights-actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggedIn: Observable<any>;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('admin', [Validators.required]),
      password: new FormControl('1234', [Validators.required]),
    });
    this.loggedIn = this.store.select(selectUser);
  }

  login() {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;

      this.store.dispatch(login({ username, password }));
    }
  }
}
