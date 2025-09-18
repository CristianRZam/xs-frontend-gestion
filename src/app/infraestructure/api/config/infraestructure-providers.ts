import { Provider } from '@angular/core';
import { AuthRepository } from '../../../core/domain/repositories/auth.repository';
import { AuthService } from '../auth.service';
import {RoleRepository} from '../../../core/domain/repositories/role.repository';
import {RoleService} from '../role.service';
import {PermissionRepository} from '../../../core/domain/repositories/permission.repository';
import {PermissionService} from '../permission.service';
import {UserService} from '../user.service';
import {UserRepository} from '../../../core/domain/repositories/user.repository';
import {ParameterService} from '../parameter.service';
import {ParameterRepository} from '../../../core/domain/repositories/parameter.repository';

export const infrastructureProviders: Provider[] = [
  { provide: AuthRepository, useClass: AuthService },
  { provide: RoleRepository, useClass: RoleService },
  { provide: PermissionRepository, useClass: PermissionService },
  { provide: UserRepository, useClass: UserService },
  { provide: ParameterRepository, useClass: ParameterService }
];
