import {RoleModel} from '../../models/role.model';
import {PermissionModel} from '../../models/permission.model';

export interface PermissionViewResponse {
  role: RoleModel;
  allPermissions: PermissionModel[];
  assignedPermissions: PermissionModel[];
}
