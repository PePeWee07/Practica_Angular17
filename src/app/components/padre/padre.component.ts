import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
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

  // OUTPUTS PROGRAMMATICALLY
  @ViewChild('childContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  private childComponentRef!: ComponentRef<HijoComponent>;
  createChild() {
    // Limpiar cualquier componente hijo existente
    this.container.clear();

    // Crear el componente dinámicamente
    this.childComponentRef = this.container.createComponent(HijoComponent);

    // Subscribirse al output `eventSendDate`
    this.childComponentRef.instance.eventSendDate.subscribe((message: string) => {
      this.addColor(message);
    });

    // Suscribirse al output `onNameChange`
    this.childComponentRef.instance.onNameChange.subscribe((message: string) => {
      this.onNotify(message);
    });

    // Subscribe to the output `nameChangeAlias`
    this.childComponentRef.instance.nameChangeAlias.subscribe((message: string) => {
      this.onNotifyAlias(message);
    });
  }

}
