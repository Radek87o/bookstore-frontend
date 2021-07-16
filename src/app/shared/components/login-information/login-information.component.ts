import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import * as _ from 'lodash';

const roles = [
  { role: 'ROLE_USER', label: 'Użytkownik' },
  { role: 'ROLE_MODERATOR', label: 'Moderator' },
  { role: 'ROLE_ADMIN', label: 'Administrator' }
]

@Component({
  selector: 'app-login-information',
  templateUrl: './login-information.component.html',
  styleUrls: ['./login-information.component.css']
})
export class LoginInformationComponent implements OnInit {

  isLoggedIn: boolean = false;
  profileImage: string = '';
  username: string = '';
  userRole: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn) {
      let user: User = this.authService.getUserFromLocalCache();
      this.profileImage = user.profileImageUrl;
      this.username = user.username ? user.username : user.email;
      this.userRole = _.find(roles, ['role', user.role]).label;
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
