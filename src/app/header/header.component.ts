import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdminView: boolean = false;

  constructor(private router: Router, 
              private navigationService: NavigationService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdminView = this.authService.isAdminOrModerator();
  }

  redirectToMainPage() {
    this.navigationService.resetPagination();
    this.router.navigateByUrl('/');
  }
}
