import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

import { ActionLoginTypes, userLoggedIn } from './login.actions';

@Injectable()
export class LoginEffects {
  loginEffects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionLoginTypes.loginAction),
      mergeMap((payload: { username: string; password: string }) =>
        this.loginService.login(payload.username, payload.password).pipe(
          map((data: any) => {
            if (data) {
              this.router.navigate(['/home-page']);
              const user = this.loginService.formatUser(data);
              this.store.dispatch(userLoggedIn());
              return { type: ActionLoginTypes.loginSuccess, user: user };
            }
          }),
          catchError(() => {
            return of({ type: ActionLoginTypes.loginFail });
          })
        )
      )
    );
  });

  logoutffects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionLoginTypes.logout),
      mergeMap((payload) =>
        of(true).pipe(
          map(() => {
            this.loginService.logout();
            localStorage.clear();
            this.router.navigate(['/']);
            return { type: ActionLoginTypes.redirectDone };
          }),
          catchError(() => {
            return of({ type: ActionLoginTypes.loginFail });
          })
        )
      )
    );
  });

  constructor(
    private loginService: LoginService,
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}
}
