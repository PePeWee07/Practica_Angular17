import { Component } from '@angular/core';
import { HijoComponent } from '../hijo/hijo.component';
import { PadreComponent } from '../padre/padre.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-output-input',
  standalone: true,
  imports: [RouterOutlet, PadreComponent, HijoComponent],
  templateUrl: './output-input.component.html',
  styleUrl: './output-input.component.scss'
})
export class OutputInputComponent {

}
