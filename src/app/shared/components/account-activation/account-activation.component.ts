import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomHttpResponse } from '../../model/custom-http-response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  userId: string = '';
  isActivationSuccessful: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.handleAccountActivation();
  }

  handleAccountActivation() {
    const activation: Observable<CustomHttpResponse | HttpErrorResponse>= this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userId = params.get('userId')
        return this.userService.activateUser(this.userId)
      })
    );

     activation.subscribe(
       (response: CustomHttpResponse) => {
         this.isActivationSuccessful=true;
       },
       (err: HttpErrorResponse) => {
         this.isActivationSuccessful=false;
       }
     ) 
  }

}
