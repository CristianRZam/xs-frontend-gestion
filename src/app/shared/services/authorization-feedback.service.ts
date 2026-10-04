import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationFeedbackService {
  private readonly unauthorizedActionSource = new Subject<void>();
  readonly unauthorizedAction$ = this.unauthorizedActionSource.asObservable();

  notifyUnauthorizedAction(): void { this.unauthorizedActionSource.next(); }
}
