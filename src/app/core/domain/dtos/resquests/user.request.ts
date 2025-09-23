
export interface UserRequest {
  id?: number;
  username?: string;
  email?: string;
  typeDocument?: number;
  document?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  roleIds?: number[];
}
