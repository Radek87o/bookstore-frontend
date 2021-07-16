import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/model/book';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookService } from 'src/app/shared/services/book.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  constructor(private bookService: BookService, 
              private navigationService: NavigationService, 
              private authService: AuthService) { }

  keyword: string = '';
  books: Book[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;
  totalElements: number = 0;
  totalPages: number = 0;
  isAdmin: boolean = true;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminOrModerator();
    this.pageNumber = this.navigationService.adminPageNumber ? this.navigationService.adminPageNumber : 1;
    this.pageSize = this.navigationService.adminPageSize ? this.navigationService.adminPageSize : 20
    this.retrieveBooks();
  }

  retrieveBooks() {
    this.bookService.getBooksList(this.pageNumber-1, this.pageSize).subscribe(
      this.processBooksResults()
    );
  }

  findBooksByKeyword(keyword: string) {
    this.bookService.getBookListByKeyword(keyword,this.pageNumber-1, this.pageSize)
      .subscribe(this.processBooksResults());
    this.keyword=keyword;
  }

  deactivateBook(book: Book) {
    if(confirm(`Czy na pewno chcesz zdezaktywować książkę: ${book.title}?`)) {
      this.bookService.deactivateBook(book.id).subscribe({
          next: () => this.retrieveBooks()
        }
      );
    }
  }

  activateBook(book: Book) {
    if(confirm(`Czy na pewno chcesz przywrócić książkę: ${book.title} do aktywnej sprzedaży?`)) {
      this.bookService.activateBook(book.id).subscribe({
          next: () => this.retrieveBooks()
        }
      );
    }
  }

  deleteBook(book: Book) {
    if(confirm(`Czy na pewno chcesz usunąć książkę: ${book.title}? Przywrócenie książki po usunięciu nie będzie możliwe`)) {
      this.bookService.deleteBook(book.id).subscribe({
          next: () => this.retrieveBooks()
        }
      );
    }
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

  resetKeyword() {
    this.keyword='';
    this.retrieveBooks();
  }

  updatePageSize(pageSize: number) {
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.navigationService.updateAdminPagination(this.pageNumber, this.pageSize);
    this.retrieveBooks();
  }

  changePage() {
    this.navigationService.updateAdminPagination(this.pageNumber, this.pageSize);
    this.retrieveBooks()
  }
}
