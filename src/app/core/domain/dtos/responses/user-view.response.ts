import {UserModel} from '../../models/user.model';

export interface UserViewResponse {
  users: UserModel[];
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalAdmins: number;
}
