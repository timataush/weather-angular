import { Routes, RouterModule } from '@angular/router';

import { ResolveLocationService } from './shared/services/resolve-location.service';
import { WeatherComponent } from './weather/weather.component';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const APP_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService } },
  { path: 'service/search', component: NotFoundComponent },
  {
    path: '**',
    component: ErrorComponent,
    data: { title: '404 Not Found', message: 'You may be lost. Follow the breadcrumbs back <a href="/">home</a>.' } }
];

