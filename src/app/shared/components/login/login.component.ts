import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginDto } from '../../model/dto/login-dto';
import { HeaderType } from '../../model/enum/header-type.enum';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoginFailed: boolean=false;
  private subscriptions: Subscription[] = [];

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/')
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  onLogin() {
    let login = new LoginDto();
    login.username = this.loginForm.get('username').value;
    login.password=this.loginForm.get('password').value;
    this.subscriptions.push(
      this.authService.login(login).subscribe(
        (response : HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          this.authService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/');
          window.location.reload();
        },
        (err: HttpErrorResponse) => {
          this.isLoginFailed=true;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
