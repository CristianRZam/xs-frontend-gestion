export interface JwtPayload {
  sub: string;
  id: number;
  email: string;
  username: string;
  active: boolean;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}
