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
    setTimeout(() => {
      this.http.get('https://api.github.com/users/PePeWee07')
        .subscribe(
          (response: any) => {
            let { name, avatar_url, login, public_repos } = response;
            this.userProfile = { name, avatar_url, login, public_repos };
            this.loadingError = true;
          },
          (error) => {
            this.loadingError = false;
            console.log("Error: ", error);
          }
        );
    }, 3000);
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

}
