import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XsCard } from '../../../../../shared/components/xs-card/xs-card';
import { XsInputText } from '../../../../../shared/components/xs-input-text/xs-input-text';
import { XsInputPassword } from '../../../../../shared/components/xs-input-password/xs-input-password';
import { ButtonModule } from 'primeng/button';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { XsToast } from '../../../../../shared/components/xs-toast/xs-toast';
import { XsLoader } from '../../../../../shared/components/xs-loader/xs-loader';
import { Formvalidators } from '../../../../../shared/validators/form-validators';
import { LoginUseCase } from '../../../../../core/application/use-cases/login.usecase';
import { AuthRequest } from '../../../../../core/domain/dtos/resquests/auth.request';
import { Router } from '@angular/router';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';

@Component({
  selector: 'xs-ingresar',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    XsCard,
    XsInputText,
    XsInputPassword,
    ButtonModule,
    XsButton,
    XsToast,
    XsLoader
  ],
  templateUrl: './xs-ingresar.html',
  styleUrl: './xs-ingresar.scss'
})
export class XsIngresar implements OnInit {
  @ViewChild('xsToast') toast!: XsToast;
  @ViewChild('xsLoader') loader!: XsLoader;

  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validators: Formvalidators,
    private readonly loginUseCase: LoginUseCase,
    private authService: AuthService,
    private router: Router
  ) {}

  get username(): AbstractControl | null { return this.formulario.get('username'); }
  get password(): AbstractControl | null { return this.formulario.get('password'); }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      username: [null, [
        this.validators.requiredValidator('Ingrese su usuario'),
      ]],
      password: [null, [
        this.validators.requiredValidator('Ingrese su contraseña'),
      ]],
    });
  }

  formSubmitEvent = async (): Promise<void> => {
    if (this.formulario.valid) {
      this.loader.show('Validando credenciales');

      const request: AuthRequest = {
        email: this.username?.value,
        password: this.password?.value,
      };

      try {
        const response = await this.loginUseCase.execute(request);
        this.authService.setToken(response.data.token);

        await this.router.navigate(['/admin']);
      } catch (err: any) {
        const msg = err?.error?.message || 'Credenciales inválidas';
        this.toast.show(msg, 'error', 'Login');
      } finally {
        this.loader.hide();
      }
    } else {
      Object.keys(this.formulario.controls).forEach(field => {
        const control = this.formulario.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      this.toast.show(
        this.validators.obtenerPrimerMensajeErrorFormulario(this.formulario),
        'error',
        'Login'
      );
    }
  };


}
