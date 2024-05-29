import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  output,
} from '@angular/core';
import { interval, take } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.scss',
})
export class HijoComponent {
  @Input()
  data: string = 'Mensaje desde el hijo';

  @Output()
  eventSendDate = new EventEmitter<string>();

  @ViewChild('values')
  input!: ElementRef<HTMLInputElement>;

  sendDataToPadre(valor: string) {
    this.eventSendDate.emit(`Mensaje desde el hijo al padre: ${valor}`);

    console.log('VALUES: ', this.input.nativeElement.value);
    this.input.nativeElement.value = '';
  }

  // New form of output
  onNameChange = output<string>();
  nameChangeAlias = output<string>({ alias: 'myAlias' });
  notifyParent() {
    this.onNameChange.emit('Message from Child');
    this.nameChangeAlias.emit('Message from Child with alias');
  }

  // With Observables
  private interval$ = interval(1000);
  timeChange = outputFromObservable(this.interval$); //crear un output basado en el observable

  // With Observables and alias
  private intervalAlias$ = interval(2000).pipe(take(5));
  timeChangeAlias = outputFromObservable(this.intervalAlias$, {
    alias: 'myOutputAlias',
  }); //crear un output basado en el observable

}
