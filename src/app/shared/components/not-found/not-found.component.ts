import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.resetPagination();
    setTimeout(()=>this.router.navigateByUrl('/'), 5000);
  }

}
