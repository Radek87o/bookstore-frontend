import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingDto } from '../../model/dto/rating-dto';
import { AuthService } from '../../services/auth.service';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  private userId: string  = '';
  userRating: number = 0;
  hasChanged: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private ratingService: RatingService, 
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn) {
      this.userId = this.authService.getUserFromLocalCache()?.id;
      const bookId = this.route.snapshot.paramMap.get('id');
      this.ratingService.getBookRating(bookId, this.userId).subscribe(
        response => {
          this.userRating=response.vote;
        }
      )
    }
  }

  onSubmit() {
    let rating = new RatingDto()
    rating.vote=this.userRating;
    const bookId = this.route.snapshot.paramMap.get('id');
    this.ratingService.saveBookRating(rating, bookId, this.userId).subscribe();
    this.hasChanged=true;
  }
}
