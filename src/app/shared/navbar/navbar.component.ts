import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { logout } from 'src/app/Store/login-store/login.actions';
import { selectIsLoggenIn } from 'src/app/Store/login-store/login.selector';

export interface Route {
  name: string;
  text: string;
}

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  show = false;
  role: string;
  open = false;
  loggedIn$: Observable<boolean>;

  constructor(
    public router: Router,
    private loginService: LoginService,

    private store: Store
  ) {}

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectIsLoggenIn);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
