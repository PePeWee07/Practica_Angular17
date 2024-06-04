import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPasswordMatchingValidator, customPasswordValidator } from '../utils/register-custom-validators';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {

  profileForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.createForm();
  }

  get firstNameNoValid() {
    return this.profileForm.get('firstName')?.invalid && this.profileForm.get('firstName')?.touched;
  }
  get lastNameNoValid() {
    return this.profileForm.get('lastName')?.invalid && this.profileForm.get('lastName')?.touched;
  }
  get emailNoValid() {
    return this.profileForm.get('email')?.invalid && this.profileForm.get('email')?.touched;
  }
  get passwordNoValid() {
    return this.profileForm.get('password')?.invalid && this.profileForm.get('password')?.touched;
  }
  get confirmPasswordNoValid() {
    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;
    return (password === confirmPassword) ? false : true;
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
      }),
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  saveForm(){
    console.log(this.profileForm);

    if(this.profileForm.invalid){
      return Object.values(this.profileForm.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  cleanForm(){
    this.profileForm.reset();
  }



  // NUEVA FORMA DE CREAR FORMULARIOS REACTIVOS
  private readonly _formBuilder = inject(FormBuilder);

  registerForm = this._formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, customPasswordValidator]], //----------VALIDACIONES PERSONALIZADAS----------//
    confirmPassword: ['', [Validators.required]],
  },
  {
    validators: customPasswordMatchingValidator //----------VALIDACIONES CRUZADAS----------//
  });

  get emailNoValidRegister() {
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }
  // Otra de control de validacion
  get nameNoValidRegister(): FormControl<string> {
    return this.registerForm.controls.name;
  }
  get passwordNoValidRegister(): FormControl<string> {
    return this.registerForm.controls.password;
  }
  get confirmPasswordNoValidRegister(): FormControl<string> {
    return this.registerForm.controls.confirmPassword;
  }

  saveRegister(){
    console.log(this.registerForm);

    //----------ESTADOS DE VALIDACION----------//
    // Obtengo el valor
    console.log("GET EMAIL: ", this.registerForm.get('email')?.value);
    // Valido si es valido
    console.log("EMAIL VALID: ", this.registerForm.controls.email.valid);


    //----------ESTADOS DE INTERACCION----------//
    // ForControl "NO" ha sido modificado por el usuario
    console.log("GET EMAIL PRISTINE: ", this.registerForm.get('email')?.pristine);
    // ForControl "SI" ha sido modificado por el usuario
    console.log("GET EMAIL DIRTY: ", this.registerForm.get('email')?.dirty);


    // ForControl "NO" ha sido enfocado por el usuario
    console.log("GET EMAIL UNTOUCHED: ", this.registerForm.get('email')?.untouched);
    // ForControl "SI" ha sido enfocado por el usuario
    console.log("GET EMAIL TOUCHED: ", this.registerForm.get('email')?.touched);


    //----------ERRORES DE VALIDACION----------//
    console.log("ERRORS: ", this.registerForm.controls.email.errors);
  }

}
