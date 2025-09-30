import { Routes } from '@angular/router';
import { XsDashboard } from './xs-dashboard/xs-dashboard';
import { XsUserView } from './xs-user/xs-user-view/xs-user-view';
import { XsRoleView } from './xs-role/xs-role-view/xs-role-view';
import { XsPermissionView } from './xs-permission/xs-permission-view/xs-permission-view';
import { XsParameterView } from './xs-parameter/xs-parameter-view/xs-parameter-view';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { XsProfileView } from './xs-profile/xs-profile-view/xs-profile-view';
import { MenuItem } from 'primeng/api';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: XsDashboard,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_DASHBOARD'],
      breadcrumb: [{ label: 'Dashboard', routerLink: '/admin' }] as MenuItem[]
    }
  },
  {
    path: 'user',
    component: XsUserView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_USER'],
      breadcrumb: [
        { label: 'Seguridad' },
        { label: 'Usuarios', routerLink: '/admin/user' }
      ] as MenuItem[]
    }
  },
  {
    path: 'role',
    component: XsRoleView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_ROLE'],
      breadcrumb: [
        { label: 'Seguridad' },
        { label: 'Roles', routerLink: '/admin/role' }
      ] as MenuItem[]
    }
  },
  {
    path: 'role/:id/permission',
    component: XsPermissionView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_PERMISSION'],
      breadcrumb: [
        { label: 'Seguridad' },
        { label: 'Roles', routerLink: '/admin/role' },
        { label: 'Permisos' }
      ] as MenuItem[]
    }
  },
  {
    path: 'profile',
    component: XsProfileView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_PROFILE'],
      breadcrumb: [
        { label: 'Mi Perfil'}
      ] as MenuItem[]
    }
  },
  {
    path: 'parameter',
    component: XsParameterView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['MANAGE_PARAMETERS'],
      breadcrumb: [
        { label: 'Configuraciones' },
        { label: 'Parámetros', routerLink: '/admin/parameter' }
      ] as MenuItem[]
    }
  }
];
