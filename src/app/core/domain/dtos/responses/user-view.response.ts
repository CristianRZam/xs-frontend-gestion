import {UserModel} from '../../models/user.model';
import {ParameterModel} from '../../models/parameter.model';

export interface UserViewResponse {
  users: UserModel[];
  typeDocuments: ParameterModel[];
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalAdmins: number;
}
