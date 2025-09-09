import { Provider } from '@angular/core';
import { AuthRepository } from '../../../core/domain/repositories/auth.repository';
import { AuthApiRepository } from '../auth-api.repository';
import {RoleRepository} from '../../../core/domain/repositories/role.repository';
import {RoleApiRepository} from '../role-api-repository';

export const infrastructureProviders: Provider[] = [
  { provide: AuthRepository, useClass: AuthApiRepository },
  { provide: RoleRepository, useClass: RoleApiRepository }
];
