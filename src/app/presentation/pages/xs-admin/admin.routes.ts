import { Routes } from '@angular/router';
import { XsDashboard } from './xs-dashboard/xs-dashboard';
import { XsUserView } from './xs-user/xs-user-view/xs-user-view';
import {XsRoleView} from './xs-role/xs-role-view/xs-role-view';
import {XsPermissionView} from './xs-permission/xs-permission-view/xs-permission-view';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: XsDashboard},
  { path: 'user', component: XsUserView},
  { path: 'role', component: XsRoleView},
  { path: 'role/:id/permission', component: XsPermissionView },
];
