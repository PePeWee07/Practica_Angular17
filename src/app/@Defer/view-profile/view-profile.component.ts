import { Component } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent {
  loadProfileBtn = false;
}
