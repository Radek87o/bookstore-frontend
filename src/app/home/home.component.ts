import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/model/book';
import { BookCard } from '../shared/model/book-card'
import { BookService } from '../shared/services/book.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = []

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooksList().subscribe(data => {
      this.books=data;
    });
  }
  
   
  // [
  //   {
  //     title: "Psie sucharki",
  //     subtitle: "Wszystko, co powiedziałby twój pies, gdyby umiał mówić",
  //     author: "Maria Apoleika",
  //     image: "https://cdn-lubimyczytac.pl/upload/books/4900000/4900481/768503-352x500.jpg",
  //     price: 29.99
  //   },
  //   {
  //     title: "Porozmawiajmy o czymś przyjemniejszym.",
  //     author: "Roz Chast",
  //     image: "https://cdn-lubimyczytac.pl/upload/books/4886000/4886245/733854-352x500.jpg",
  //     price: 23.80
  //   },
  //   {
  //     title: "O północy w Czarnobylu",
  //     subtitle: "Nieznana prawda o największej nuklearnej katastrofie",
  //     author: "Adam Higginbotham",
  //     image: "https://cdn-lubimyczytac.pl/upload/books/4897000/4897078/793300-352x500.jpg",
  //     price: 31
  //   },
  //   {
  //     title: "Shantaram",
  //     author: "Gregory David Roberts",
  //     image: "https://cdn-lubimyczytac.pl/upload/books/291000/291636/447547-352x500.jpg",
  //     price: 24.85
  //   },
  //   {
  //     title: "Horyzont",
  //     author: "Jakub Małecki",
  //     image: "https://cdn-lubimyczytac.pl/upload/books/4892000/4892000/787639-352x500.jpg",
  //     price: 26.99
  //   }
  // ]

}
