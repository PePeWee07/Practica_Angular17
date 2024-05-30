import { Routes } from '@angular/router';
import { PadreComponent } from './components/padre/padre.component';
import { HijoComponent } from './components/hijo/hijo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OutputInputComponent } from './components/output-input/output-input.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

export const routes: Routes = [
  {
    path: 'output-input',
    component: OutputInputComponent
  },
  {
    path: 'padre',
    component: PadreComponent
  },
  {
    path: 'hijo',
    component: HijoComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'viewProfile',
    component: ViewProfileComponent
  }
];
