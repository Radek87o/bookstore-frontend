import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdminView: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, 
              private navigationService: NavigationService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdminView = this.authService.isAdminOrModerator();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  redirectToMainPage() {
    this.navigationService.resetPagination();
    this.router.navigateByUrl('/');
  }

  linkToUserPanel() {
    if(this.isLoggedIn) {
      this.router.navigateByUrl('/uzytkownik')
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
