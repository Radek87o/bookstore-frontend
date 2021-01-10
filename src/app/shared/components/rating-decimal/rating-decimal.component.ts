import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RatingService } from '../../services/rating.service'

@Component({
  selector: 'app-rating-decimal',
  templateUrl: './rating-decimal.component.html',
  styleUrls: ['./rating-decimal.component.css']
})
export class RatingDecimalComponent implements OnInit {

  currentRate: number = 0;
  votesNumber: number = 0

  constructor(private ratingService: RatingService, private route: ActivatedRoute) { }


  //todo - przerobić na rxjs
  //todo - zmienić sposób przekazywania parametrów

  ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');
    this.ratingService.getBookRatings(currentId).subscribe(
      data => {
        if(data.length>0) {
          console.log(data);
          let totalRates = 0;
          let avgRate = 0
          data.forEach(rating => totalRates+=rating.vote);
          avgRate=totalRates/(data.length);
          this.votesNumber=data.length;
          this.currentRate=avgRate;
        }
      }
    );    
  }

}
