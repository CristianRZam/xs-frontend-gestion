import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {XsProfileDetail} from '../xs-profile-detail/xs-profile-detail';
import {ProfileUseCase} from '../../../../../core/application/use-cases/profile.usecase';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ProfileDto} from '../../../../../core/domain/dtos/responses/profile-dto';
import {XsProfileRegister} from '../xs-profile-register/xs-profile-register';
import {ProfileRequest} from '../../../../../core/domain/dtos/resquests/profile.request';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';
import {XsProfilePasswordChange} from '../xs-profile-password-change/xs-profile-password-change';
import {PasswordRequest} from '../../../../../core/domain/dtos/resquests/password.request';
import {XsProfilePermission} from '../xs-profile-permission/xs-profile-permission';

@Component({
  selector: 'xs-profile-view',
  imports: [
    XsProfileDetail,
    XsLoader,
    XsToast,
    XsProfileRegister,
    XsProfilePasswordChange,
    XsProfilePermission
  ],
  templateUrl: './xs-profile-view.html',
  styleUrl: './xs-profile-view.scss'
})
export class XsProfileView implements OnInit, AfterViewInit {

  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastRoleView') private toast!: XsToast;
  @ViewChild(XsProfileRegister) private profileRegister!: XsProfileRegister;
  @ViewChild(XsProfilePasswordChange) private profileChangePassword!: XsProfilePasswordChange;
  @ViewChild(XsProfilePermission) private profilePermission!: XsProfilePermission;

    public user: ProfileDto = {};

    constructor(
      private profileUseCase: ProfileUseCase,
      private errorHandler: ErrorHandlerService,
    ) {

    }

    ngOnInit(): void {

    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }


  load(){
      this.loader.show('Cargando Datos...');

      this.profileUseCase.init().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const data = response.data;
            this.user = data.user;
          } else {
            console.warn('No se recibieron datos válidos del usuario', response);
          }
          this.loader.hide();
        },
        error: (err) => {
          console.error('Error al cargar roles', err);
          this.loader.hide();
        }
      });
    }

    loadForm(){
      this.loader.show('Cargando Datos...');

      this.profileUseCase.initForm().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const data = response.data;
            this.profileRegister.openDialog(
              data
            );
          } else {
            console.warn('No se recibieron datos válidos del usuario', response);
          }
          this.loader.hide();
        },
        error: (err) => {
          console.error('Error al cargar roles', err);
          this.loader.hide();
        }
      });
    }

  update(item: ProfileRequest) {
    this.loader.show('Actualizando mis datos...');
    this.profileUseCase.update(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Datos actualizados con éxito.");
          this.load();
          this.profileRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar tus datos.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "Perfil");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onChangePassword(){
      this.profileChangePassword.openDialog();
  }

  updatePassword(item: PasswordRequest) {
    this.loader.show('Actualizando Contraseña...');
    this.profileUseCase.updatePassword(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Contraseña actualizada.");
          this.load();
          this.profileChangePassword.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar la contraseña.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "contraseña");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onDisable() {
    this.loader.show('Deshabilitando cuenta...');
    this.profileUseCase.disableAccount().subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Cuenta deshabilitada.");
          this.load();
        } else {
          this.toast.show(res.message || "No se pudo deshabilitar la cuenta.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "Perfil");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  updateAvatar(file: File) {
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    this.loader.show('Subiendo avatar...');

    this.profileUseCase.uploadAvatar(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show('Avatar actualizado correctamente.');
          this.user = res.data;
        } else {
          this.toast.show(res.message || 'No se pudo actualizar el avatar.', 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, 'subir', 'Avatar');
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  deleteAvatar() {
      this.loader.show('Eliminando avatar...');

      this.profileUseCase.deleteAvatar().subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.show('Avatar eliminado correctamente.');
            this.user = res.data;
          } else {
            this.toast.show(res.message || 'No se pudo eliminar el avatar.', 'error');
          }
        },
        error: (e) => {
          const msg = this.errorHandler.getErrorMessage(e, 'eliminar', 'Avatar');
          this.toast.show(msg, 'error');
          this.loader.hide();
        },
        complete: () => this.loader.hide()
      });
  }


  loadPermissions() {
    this.loader.show('cargando...');

    this.profileUseCase.loadMyPermissions().subscribe({
      next: (res) => {
        if (res.success) {
          this.profilePermission.openDialog(res.data);
        } else {
          this.toast.show(res.message || 'No se pudo cargar datos.', 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, 'cargar', 'Permisos');
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }
}
