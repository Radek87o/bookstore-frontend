import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

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

}
