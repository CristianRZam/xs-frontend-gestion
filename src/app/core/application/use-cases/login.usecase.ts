import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthRequest } from '../../domain/dtos/resquests/auth.request';
import { AuthResponse } from '../../domain/dtos/responses/auth.response';
import { AuthService } from '../../../infraestructure/persistence/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authService: AuthService
  ) {}

  async execute(request: AuthRequest): Promise<AuthResponse> {
    const response = await this.authRepository.login(request);
    this.authService.setToken(response.token); 
    return response;
  }
}
