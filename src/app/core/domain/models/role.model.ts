export interface RoleModel {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
  permissions?: string[];

  // === Campos de auditoría ===
  createdBy?: number;
  createdAt?: string;
  modifiedBy?: number;
  modifiedAt?: string;
  deletedBy?: number;
  deletedAt?: string;
}
