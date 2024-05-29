import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userProfile: any;
  loadingError: boolean = false;

  constructor(private http: HttpClient) { }

  loadUserProfile() {
    this.http.get('https://api.github.com/users/PePeWee07')
      .subscribe(
        (response) => {
          this.userProfile = response;
        },
        (error) => {
          this.loadingError = true;
        }
      );
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

}
