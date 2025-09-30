// user.model.ts
import {PersonModel} from './person.model';
import {RoleModel} from './role.model';

export interface UserRoleModel {
  id?: number;
  role?: RoleModel;
  deleted?: boolean;
}
