import {RoleModel} from '../../models/role.model';


export interface RoleViewResponse {
  roles: RoleModel[];
  totalRoles: number;
  activeRoles: number;
  inactiveRoles: number;
  totalPermissions: number;
}
