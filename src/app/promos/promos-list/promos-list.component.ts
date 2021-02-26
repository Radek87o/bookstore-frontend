import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/model/book';
import { BookService } from 'src/app/shared/services/book.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-promos-list',
  templateUrl: './promos-list.component.html',
  styleUrls: ['./promos-list.component.css']
})
export class PromosListComponent implements OnInit {

  pageNumber: number = 1;
  pageSize: number=24;
  totalElements: number = 0;
  totalPages: number = 0;
  books: Book[] = [];

  constructor(private bookService: BookService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.pageNumber = this.navigationService.promoPageNumber? this.navigationService.promoPageNumber : 1;
    this.pageSize = this.navigationService.promoPageSize ? this.navigationService.promoPageSize : 24;
    this.findBooksWithPromo();
  }

  findBooksWithPromo() {
    this.bookService.getBooksWithPromo(this.pageNumber-1, this.pageSize).subscribe(
      this.processBooksResults()
    )
  }

  changePage() {
    this.navigationService.updatePromoPagination(this.pageNumber, this.pageSize);
    this.findBooksWithPromo();
  }

  updatePageSize(pageSize: number) {
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.navigationService.updatePromoPagination(this.pageNumber, this.pageSize);
    this.findBooksWithPromo();
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
