import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingDto } from '../../model/dto/rating-dto';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  private userId: string  = '408a2c8b-ea95-4c81-b952-2e4a124a1b50';
  userRating: number = 0;
  hasChanged: boolean = false;

  constructor(private ratingService: RatingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.ratingService.getBookRating(bookId, this.userId).subscribe(
      response => {
        this.userRating=response.vote;
      }
    )
  }

  onSubmit() {
    let rating = new RatingDto()
    console.log("zmiana")
    rating.vote=this.userRating;
    const bookId = this.route.snapshot.paramMap.get('id');
    this.ratingService.saveBookRating(rating, bookId, this.userId).subscribe();
    this.hasChanged=true;
  }
}
