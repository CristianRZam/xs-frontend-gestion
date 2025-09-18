import {UserModel} from '../../models/user.model';
import {ParameterModel} from '../../models/parameter.model';
import {RoleModel} from '../../models/role.model';

export interface UserFormResponse {
  user?: UserModel;
  documentTypes: ParameterModel[];
  roles: RoleModel[];
}
