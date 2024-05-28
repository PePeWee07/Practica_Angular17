import { Routes } from '@angular/router';
import { PadreComponent } from './components/padre/padre.component';
import { HijoComponent } from './components/hijo/hijo.component';

export const routes: Routes = [
  {
    path: 'padre',
    component: PadreComponent
  },
  {
    path: 'hijo',
    component: HijoComponent
  }
];
