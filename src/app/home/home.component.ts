import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../shared/model/book';
import { CategoryWrapper } from '../shared/model/category-wrapper';
import { BookService, BooksListResponse } from '../shared/services/book.service'
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
  totalElements: number = 0;
  totalPages: number = 0;
  pageNumber: number = 1;
  pageSize: number = 24; 


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
    this.bookService.getBooksList(this.pageNumber-1, this.pageSize).subscribe(this.processBooksResults());
  }

  handleSearchBooks() {
    console.log("inside search books method");
    const bookObservable: Observable<BooksListResponse> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.keyword = params.get('keyword');
        document.getElementById('searchResults').style.display='none';
        return this.bookService.getBookListByKeyword(params.get('keyword'),this.pageNumber-1, this.pageSize);
      })
    )

    bookObservable.subscribe(this.processBooksResults())
  }

  handleCategoryBooks() {
    console.log("inside category books method");
    const categoryWrapper: Observable<CategoryWrapper> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.categoryService.getCategoryBooks(params.get('categoryId'), this.pageNumber-1, this.pageSize);
      })
    )
    
    categoryWrapper.subscribe(data => {
      this.books=data.books.content;
      this.categoryName=data.name
      this.pageNumber=data.books.pageable.pageNumber+1;
      this.pageSize=data.books.pageable.pageSize;
      this.totalPages=data.books.totalPages;
      this.totalElements=data.books.totalElements;
    })
  }

  updatePageSize(pageSize: number) {
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.listBooks();
  }

  processBooksResults() {
    return data => {
      this.books=data.content;
      this.pageSize=data.pageable.pageSize;
      this.pageNumber=data.pageable.pageNumber+1;
      this.totalElements=data.totalElements;
      this.totalPages=data.totalPages;      
    }
  }
}
