import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  output,
} from '@angular/core';

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
}
