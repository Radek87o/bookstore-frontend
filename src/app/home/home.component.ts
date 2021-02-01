import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../shared/model/book';
import { BookService } from '../shared/services/book.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  searchMode: boolean;
  keyword: string = '';

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword')

    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    this.bookService.getBooksList().subscribe(data => {
      this.books=data;
    });
  }

  handleSearchProducts() {
  
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
}
