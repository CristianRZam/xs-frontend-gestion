import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../../infraestructure/persistence/auth.service';


export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredPermissions = route.data['permissions'] as string[] || [];

  if (!auth.isAuthenticated()) {
    auth.clearToken();
    router.navigate(['/login']);
    return false;
  }

  const userPermissions = auth.getPermissions();
  const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));

  if (!hasPermission) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
