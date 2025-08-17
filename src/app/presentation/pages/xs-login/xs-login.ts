import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { XsCard } from '../../../shared/components/xs-card/xs-card';
import { XsInputText } from '../../../shared/components/xs-input-text/xs-input-text';
import { XsInputPassword } from '../../../shared/components/xs-input-password/xs-input-password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { XsButton } from "../../../shared/components/xs-button/xs-button";
import { Formvalidators } from '../../../shared/validators/form-validators';

@Component({
  selector: 'xs-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    XsCard,
    XsInputText,
    XsInputPassword,
    ButtonModule,
    XsButton
],
  templateUrl: './xs-login.html',
  styleUrls: ['./xs-login.scss'],
})
export class XsLogin implements OnInit {
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validators: Formvalidators,
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

  formSubmitEvent(): void {
    if (this.formulario.valid) {
          console.log(this.formulario.value);
    }else {
      Object.keys(this.formulario.controls).forEach(field => {
        const control = this.formulario.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      
    }
  }
}

