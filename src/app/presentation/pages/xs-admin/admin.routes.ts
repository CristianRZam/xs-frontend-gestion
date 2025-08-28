import { Routes } from '@angular/router';
import { XsDashboard } from './xs-dashboard/xs-dashboard';
import { XsUserView } from './xs-user/xs-user-view/xs-user-view';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: XsDashboard},
  { path: 'user', component: XsUserView},
];
