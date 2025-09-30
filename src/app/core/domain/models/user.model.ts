// user.model.ts
import {PersonModel} from './person.model';
import {RoleModel} from './role.model';
import {UserRoleModel} from './user-role.model';

export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  active?: boolean;
  userRoles?: UserRoleModel[];
  permissions?: string[];
  deleted?: boolean;
  person?: PersonModel;
}
