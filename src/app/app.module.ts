import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';

import { HomePageModule } from './home-page/home-page.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { loginReducer } from './Store/login-store/login.reducers';
import { LoginEffects } from './Store/login-store/login.effects';
import { flightsReducer } from './Store/flights-store/flights.reducers';
import { FlightsEffects } from './Store/flights-store/flights.effects';

import { LoginService } from './services/login.service';
import { FlightService } from './services/flightService';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot({ login: loginReducer, flights: flightsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    EffectsModule.forRoot([LoginEffects, FlightsEffects]),
  ],
  providers: [FlightService],
  bootstrap: [AppComponent],
})
export class AppModule {}
