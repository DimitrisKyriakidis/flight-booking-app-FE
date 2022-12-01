import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //loggedIn$: Observable<boolean>;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.loginService.checkExpiration();
    }
  }
}
