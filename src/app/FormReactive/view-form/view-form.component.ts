import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormUserComponent],
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.scss'
})
export class ViewFormComponent {

}
