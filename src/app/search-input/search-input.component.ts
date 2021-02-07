import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from '../shared/model/book';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  model: any;
  books: Book[] = [];

  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  findBookByKeyword(value: string) {
    document.getElementById('searchResults').style.display='none';
    this.router.navigateByUrl(`/szukaj/${value}`)
  }

  displayKeywordProposals(searchInput: any) {
    if(searchInput.key==='Enter') {
      document.getElementById('searchResults').style.display='none';
      return;
    }
    document.getElementById('searchResults').style.display='block';
    this.bookService.getBookListByKeyword(searchInput.target.value, 0, 5).subscribe(
      data => {
        this.books=data.content;
      }
    )
  }

  clearResults() {
    document.getElementById('searchResults').style.display='none';
  }
}
