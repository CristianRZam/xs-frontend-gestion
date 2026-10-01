import { Routes } from '@angular/router';
import { XsDashboard } from './xs-dashboard/xs-dashboard';
import { XsUserView } from './xs-user/xs-user-view/xs-user-view';
import { XsRoleView } from './xs-role/xs-role-view/xs-role-view';
import { XsPermissionView } from './xs-permission/xs-permission-view/xs-permission-view';
import { XsParameterView } from './xs-parameter/xs-parameter-view/xs-parameter-view';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { XsProfileView } from './xs-profile/xs-profile-view/xs-profile-view';
import { MenuItem } from 'primeng/api';
import {XsProductView} from './xs-product/xs-product-view/xs-product-view';
import { XsCashSessionView } from './xs-cash-session/xs-cash-session-view/xs-cash-session-view';
import { XsInventoryCountView } from './xs-inventory-count/xs-inventory-count-view/xs-inventory-count-view';
import { XsSaleView } from './xs-sale/xs-sale-view/xs-sale-view';
import { XsOrderView } from './xs-order/xs-order-view/xs-order-view';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
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
      permissions: ['VIEW_PARAMETER'],
      breadcrumb: [
        { label: 'Configuraciones' },
        { label: 'Parámetros', routerLink: '/admin/parameter' }
      ] as MenuItem[]
    }
  },
  {
    path: 'product',
    component: XsProductView,
    canActivate: [permissionGuard],
    data: {
      permissions: ['VIEW_PARAMETER'],
      breadcrumb: [
        { label: 'Productos' },
      ] as MenuItem[]
    }
  },
  {
    path: 'cash-session',
    component: XsCashSessionView,
    data: {
      breadcrumb: [
        { label: 'Operaciones' },
        { label: 'Caja', routerLink: '/admin/cash-session' }
      ] as MenuItem[]
    }
  },
  {
    path: 'inventory-count',
    component: XsInventoryCountView,
    data: {
      breadcrumb: [
        { label: 'Operaciones' },
        { label: 'Conteo de productos', routerLink: '/admin/inventory-count' }
      ] as MenuItem[]
    }
  },
  { path: 'sales', component: XsSaleView, data: { breadcrumb: [{ label: 'Operaciones' }, { label: 'Ventas', routerLink: '/admin/sales' }] as MenuItem[] } },
  { path: 'orders', component: XsOrderView, data: { breadcrumb: [{ label: 'Operaciones' }, { label: 'Órdenes', routerLink: '/admin/orders' }] as MenuItem[] } }
];
