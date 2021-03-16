import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/model/category';
import { CategoryService } from '../shared/services/category.service';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, 
              private router: Router,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.populateCategories();
  }

  populateCategories() {
    this.categoryService.getCategoriesList().subscribe(
      data => {
        this.categories=data;
      }
    )
  }

  redirectToMainPage() {
    this.navigationService.resetPagination();
    this.router.navigateByUrl('/');
  }
}
