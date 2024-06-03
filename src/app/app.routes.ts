import { Routes } from '@angular/router';
import { PadreComponent } from './Output-Input/padre/padre.component';
import { HijoComponent } from './Output-Input/hijo/hijo.component';
import { UserProfileComponent } from './@Defer/user-profile/user-profile.component';
import { OutputInputComponent } from './Output-Input/output-input/output-input.component';
import { ViewProfileComponent } from './@Defer/view-profile/view-profile.component';
import { ViewFormComponent } from './FormReactive/view-form/view-form.component';

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
  },
  {
    path: 'form',
    component: ViewFormComponent
  }
];
