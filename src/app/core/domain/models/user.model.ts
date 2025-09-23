// user.model.ts
import {PersonModel} from './person.model';
import {RoleModel} from './role.model';

export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  active?: boolean;
  roles?: RoleModel[];
  permissions?: string[];
  deleted?: boolean;
  person?: PersonModel;
}
