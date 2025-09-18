import { Routes } from '@angular/router';
import { XsDashboard } from './xs-dashboard/xs-dashboard';
import { XsUserView } from './xs-user/xs-user-view/xs-user-view';
import { XsRoleView } from './xs-role/xs-role-view/xs-role-view';
import { XsPermissionView } from './xs-permission/xs-permission-view/xs-permission-view';
import { XsParameterView } from './xs-parameter/xs-parameter-view/xs-parameter-view';
import { permissionGuard } from '../../../core/guards/permission.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: XsDashboard,
    canActivate: [permissionGuard],
    data: { permissions: ['VIEW_DASHBOARD'] }
  },
  {
    path: 'user',
    component: XsUserView,
    canActivate: [permissionGuard],
    data: { permissions: ['MANAGE_USERS'] } // ✅ llave cerrada
  },
  {
    path: 'role',
    component: XsRoleView,
    canActivate: [permissionGuard],
    data: { permissions: ['MANAGE_ROLES'] }
  },
  {
    path: 'role/:id/permission',
    component: XsPermissionView,
    canActivate: [permissionGuard],
    data: { permissions: ['MANAGE_PERMISSIONS'] }
  },
  {
    path: 'parameter',
    component: XsParameterView,
    canActivate: [permissionGuard],
    data: { permissions: ['MANAGE_PARAMETERS'] }
  },
];
