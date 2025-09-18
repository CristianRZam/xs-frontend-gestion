import { AuthResponse } from "../dtos/responses/auth.response";
import { AuthRequest } from "../dtos/resquests/auth.request";
import {ApiResponse} from '../dtos/responses/api.response';

export abstract class AuthRepository {
  abstract login(request: AuthRequest): Promise<ApiResponse<AuthResponse>>;
}
