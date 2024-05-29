import { Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { HijoComponent } from '../hijo/hijo.component';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent implements OnDestroy{

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


  //OUTPUT BASADO EN OBSERVABLES
  @ViewChild('childContainer2', { read: ViewContainerRef }) container2!: ViewContainerRef;
  private childComponentRef2!: ComponentRef<HijoComponent>;
  private timeChangeSubscription!: Subscription;
  createChild2() {
    this.container2.clear();

    this.childComponentRef2 = this.container2.createComponent(HijoComponent);

    // Usar outputToObservable para convertir el output a un observable
    this.timeChangeSubscription = outputToObservable(this.childComponentRef2.instance.timeChange)
      .subscribe((time: number) => {
        this.onTimeChange(time);
      });
  }

  arrayNumber: Array<number> = [];
  onTimeChange(time: number) {
    this.arrayNumber.push(time);
  }

  // Desuscribirse al destruir el componente padre
  ngOnDestroy() {
    if (this.timeChangeSubscription) {
      this.timeChangeSubscription.unsubscribe();
    }
  }


  //OUTPUT BASADO EN OBSERVABLES
  @ViewChild('childContainer3', { read: ViewContainerRef }) container3!: ViewContainerRef;
  private childComponentRef3!: ComponentRef<HijoComponent>;
  private timeChangeLimitedSubscription!: Subscription;

  createChild3(){
    this.container3.clear();

    this.childComponentRef3 = this.container3.createComponent(HijoComponent);

    this.timeChangeLimitedSubscription = outputToObservable(this.childComponentRef3.instance.timeChangeAlias)
      .subscribe({
        next: (time: number) => {
          this.onTimeChangeLimited(time);
        },
        complete: () => {
          alert('Se ha completado la emisión de datos');
        }
      });
  }

  arrayNumberLimited: Array<number> = [];
  onTimeChangeLimited(time: number) {
    this.arrayNumberLimited.push(time);
    console.log('TIME LIMITED: ', time);
    setTimeout(() => {
      if (this.timeChangeLimitedSubscription) {
        this.timeChangeLimitedSubscription.unsubscribe();
      }
      console.log('Se ha desuscripto el observable');
    }, 5000);
  }


}
