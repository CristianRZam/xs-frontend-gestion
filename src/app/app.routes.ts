import { Routes } from '@angular/router';
import { XsPortalHost } from './presentation/pages/xs-portal/xs-portal-host/xs-portal-host';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { XsNoFound } from './presentation/pages/xs-no-found/xs-no-found';
import { XsHostView } from './presentation/pages/xs-admin/xs-host/xs-host-view/xs-host-view';
import {XsUnauthorized} from './presentation/pages/xs-unauthorized/xs-unauthorized';

export const routes: Routes = [
  {
    path: '',
    component: XsPortalHost,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./presentation/pages/xs-portal/portal.routes').then(m => m.PORTAL_ROUTES),
      },
    ],
  },
  {
    path: 'admin',
    component: XsHostView,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./presentation/pages/xs-admin/admin.routes').then(m => m.ADMIN_ROUTES),
      },
    ],
  },
  {
    path: 'unauthorized',
    component: XsUnauthorized,
  },
  {
    path: '**',
    component: XsNoFound,
  },
];
