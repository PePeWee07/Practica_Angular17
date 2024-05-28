import { Component } from '@angular/core';
import { HijoComponent } from '../hijo/hijo.component';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent {

  dataPadre: string = 'Mensaje desde el padre';

  //Array de colores
  colors: Array<string>= ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Naranja'];

  addColor(color: string) {
    this.colors.push(color);
  }

  newTitle: string = '...';
  onNotify(message: string) {
    this.newTitle = message;
    console.log('Received message from child:', message);
  }

  nameAlias: string = '...';
  onNotifyAlias(message: string) {
    this.nameAlias = message;
    console.log('Received message from child with alias:', message);
  }

}
