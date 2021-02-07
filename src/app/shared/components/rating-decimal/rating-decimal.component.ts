import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Rating } from '../../model/rating';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating-decimal',
  templateUrl: './rating-decimal.component.html',
  styleUrls: ['./rating-decimal.component.css']
})
export class RatingDecimalComponent implements OnInit {

  currentRate: number = 0;
  votesNumber: number = 0

  constructor(private ratingService: RatingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const bookRatingsObservable: Observable<Rating[]> = this.route.paramMap.pipe(
      switchMap((params, ParamMap) =>{
        return this.ratingService.getBookRatings(params.get('id'))
      })
    )

    bookRatingsObservable.subscribe(
      data => {
        if(data.length>0) {
          let totalRates = 0;
          let avgRate = 0
          data.forEach(rating => totalRates+=rating.vote);
          avgRate=totalRates/(data.length);
          this.votesNumber=data.length;
          this.currentRate=avgRate;
        }
      }
    )
  }

}
