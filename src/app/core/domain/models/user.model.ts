// user.model.ts
export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  active?: boolean;
  roles?: string[];
  permissions?: string[];
  deleted?: boolean;
}
