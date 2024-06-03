import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {

  // name = new FormControl('');

  profileForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
      }),
      password: [''],
      confirmPassword: ['']
    });
  }

  saveForm(){
    console.log(this.profileForm);
  }

  cleanForm(){
    this.profileForm.reset();
  }

}
