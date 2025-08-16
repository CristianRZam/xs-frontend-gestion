import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { XsCard } from '../../../shared/components/xs-card/xs-card';
import { XsInputText } from '../../../shared/components/xs-input-text/xs-input-text';
import { XsInputPassword } from '../../../shared/components/xs-input-password/xs-input-password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { XsButton } from "../../../shared/components/xs-button/xs-button";

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
  styleUrls: ['./xs-login.scss'], // corregí "styleUrl" -> "styleUrls"
})
export class XsLogin {
  exampleForm!: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.exampleForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    // Suscribirse a cambios de todo el formulario
    this.exampleForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', values);
    });

    // Suscribirse a cambios de cada control individual (opcional)
    this.exampleForm.controls.username.valueChanges.subscribe(value => {
      console.log('Username changed:', value);
    });
    this.exampleForm.controls.password.valueChanges.subscribe(value => {
      console.log('Password changed:', value);
    });
  }

  onSubmit(): void {
    if (this.exampleForm.valid) {
      console.log('Form submitted:', this.exampleForm.value);
    } else {
      console.log('Form invalid');
      this.exampleForm.markAllAsTouched();
    }
  }
}
