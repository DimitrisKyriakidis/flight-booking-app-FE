import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { OnDemandPreloadStrategyService } from './on-demand-preload/on-demand-preload-strategy.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home-page',
    loadChildren: () =>
      import('../home-page/home-page.module').then((m) => m.HomePageModule),
  },

  {
    path: 'book-flight/:id/:from/:to/:dateFrom/:dateTo/:seatType/:passengers',
    loadChildren: () =>
      import('../book-flight/book-flight.module').then(
        (m) => m.BookFlightModule
      ),
  },

  // {
  //   path: 'flight-results/:from/:to/:dateFrom/:dateTo/:seatType/:passengers',
  //   loadChildren: () =>
  //     import('../flight-results/flight-results.module').then(
  //       (m) => m.FlightResultsModule
  //     ),
  // },

  // {
  //   path: 'filters-form',
  //   loadChildren: () =>
  //     import('../filters-form/filters-form.module').then(
  //       (m) => m.FiltersFormModule
  //     ),
  // },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      // preloadingStrategy: OnDemandPreloadStrategyService,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
