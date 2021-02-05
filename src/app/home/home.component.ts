import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../shared/model/book';
import { CategoryWrapper } from '../shared/model/category-wrapper';
import { BookService } from '../shared/services/book.service'
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  searchMode: boolean = false;
  categoryMode: boolean = false;
  categoryName: string = '';
  keyword: string = '';

  constructor(private bookService: BookService, 
              private categoryService: CategoryService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    this.categoryMode=this.route.snapshot.paramMap.has('categoryId');
    
    if(this.searchMode) {
      this.handleSearchBooks();
    } else if(this.categoryMode){
      this.handleCategoryBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    this.bookService.getBooksList().subscribe(data => {
      this.books=data;
    });
  }

  handleSearchBooks() {
  
    const bookObservable: Observable<Book[]> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.keyword = params.get('keyword');
        document.getElementById('searchResults').style.display='none';
        return this.bookService.getBookListByKeyword(params.get('keyword'), 0, 24);
      })
    )

    bookObservable.subscribe(data => {
      this.books=data;
    })
  }

  handleCategoryBooks() {
    const categoryWrapper: Observable<CategoryWrapper> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.categoryService.getCategoryBooks(params.get('categoryId'), 0, 24);
      })
    )
    
    categoryWrapper.subscribe(data => {
      this.books=data.books.content;
      this.categoryName=data.name
    })
  }
}
