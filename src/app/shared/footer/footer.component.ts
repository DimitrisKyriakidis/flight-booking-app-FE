import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggenIn } from 'src/app/Store/login-store/login.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedIn = this.store.select(selectIsLoggenIn);
  }
}
