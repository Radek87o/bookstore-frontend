import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdminView: boolean = true;

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.navigationService.resetPagination();
    this.router.navigateByUrl('/');
  }
}
