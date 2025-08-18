import { AuthResponse } from "../dtos/responses/auth.response";
import { AuthRequest } from "../dtos/resquests/auth.request";

export abstract class AuthRepository {
  abstract login(request: AuthRequest): Promise<AuthResponse>;
}
