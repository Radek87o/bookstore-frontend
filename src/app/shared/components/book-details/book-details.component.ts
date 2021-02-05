import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book';
import { AvailabilityState } from '../../model/availability-state.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();
  availabilityState: AvailabilityState = AvailabilityState.available;
  showComments: boolean = false;
  activeRating: boolean = false;
  
  constructor(private bookService: BookService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

      const bookObservable: Observable<Book> = this.route.paramMap.pipe(
        switchMap((params, ParamMap)=>{
          const id = params.get('id');
          return this.bookService.getBook(id);
        })
      );

      bookObservable.subscribe(data => {
        this.book=data;
        this.availabilityState=this.determineAvailabilityState(this.book);
      });
  }

  determineAvailabilityState(book: Book): AvailabilityState {
    if(!book.active || book.unitsInStock<3) {
      return AvailabilityState.unavailable;
    } else if(book.unitsInStock>=3 && book.unitsInStock<10){
      return AvailabilityState.limited;
    } else {
      return AvailabilityState.available;
    }
  }

  hideCommentsSection() {
    this.showComments=false;
  }

  showCommentsSection() {
    this.showComments=true;
  }

  extractPagesNumber(book: Book) : string{
    if(!book.pages) {
      return 'bd.';
    }
    return book.pages.toString()
  }

  back() {
    this.location.back();
  }
}
