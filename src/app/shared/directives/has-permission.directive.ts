import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {AuthService} from '../../infraestructure/persistence/auth.service';


@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private permissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.permissions = this.authService.getPermissions();
  }

  @Input() set appHasPermission(requiredPermission: string | string[]) {
    this.viewContainer.clear();

    const hasPermission = Array.isArray(requiredPermission)
      ? requiredPermission.some(p => this.permissions.includes(p))
      : this.permissions.includes(requiredPermission);

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
