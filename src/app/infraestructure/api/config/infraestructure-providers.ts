import { Provider } from '@angular/core';
import { AuthRepository } from '../../../core/domain/repositories/auth.repository';
import { AuthApiRepository } from '../auth-api.repository';

export const infrastructureProviders: Provider[] = [
  { provide: AuthRepository, useClass: AuthApiRepository }
];
