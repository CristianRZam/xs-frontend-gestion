import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ProfileDto} from '../../../../../core/domain/dtos/responses/profile-dto';
import {XsButton} from '../../../../../shared/components/xs-button/xs-button';
import {XsCard} from '../../../../../shared/components/xs-card/xs-card';
import {XsConfirmDialog} from '../../../../../shared/components/xs-confirm-dialog/xs-confirm-dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'xs-profile-detail',
  imports: [
    XsButton,
    XsCard,
    XsConfirmDialog,
    CommonModule
  ],
  templateUrl: './xs-profile-detail.html',
  styleUrl: './xs-profile-detail.scss'
})
export class XsProfileDetail {
  @ViewChild('xsConfirmDialog') private confirmDialog!: XsConfirmDialog;

  @Input() user: ProfileDto = {};

  @Output() updateProfile: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePassword: EventEmitter<void> = new EventEmitter<void>();
  @Output() disable: EventEmitter<void> = new EventEmitter<void>();
  @Output() uploadAvatar: EventEmitter<File> = new EventEmitter<File>();
  @Output() deleteAvatar: EventEmitter<void> = new EventEmitter<void>();
  @Output() viewPermissions: EventEmitter<void> = new EventEmitter<void>();

  onUpdate() {
    this.updateProfile.emit();
  }

  onChangePassword(){
    this.changePassword.emit();
  }

  onDisable() {
    this.confirmDialog.show({
      message: '¿Está seguro(a) que desea deshabilitar su cuenta?',
      onClickAceptar: () => this.disable.emit(),
    });
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // 👉 Aquí emitimos el archivo para que el padre lo maneje (subida al backend)
      this.uploadAvatar.emit(file);
    }
  }


  onDeleteAvatar() {
    this.confirmDialog.show({
      message: '¿Está seguro(a) de que desea eliminar su avatar? Esta acción no se puede deshacer.',
      onClickAceptar: () => this.deleteAvatar.emit(),
    });
  }

  onViewPermissions() {
    this.viewPermissions.emit();
  }
}
