import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomHttpResponse } from '../../model/custom-http-response';
import { ResetPasswordDto } from '../../model/dto/reset-password-dto';
import { UserService } from '../../services/user.service';
import { BookStoreValidators } from '../../utils/book-store-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private emailPattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$";
  private passwordPattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()])[A-Za-z\\d@$!%*?&#^()]{8,}$";
  private subscriptions: Subscription[] = [];

  isResetPasswordFailed: boolean = false;
  errorMessage: string ='';

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])  
  },{validators: [BookStoreValidators.passwordsNonMatching]});

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onResetPassword() {
    let resetPassword = new ResetPasswordDto();
    resetPassword.email = this.resetPasswordForm.get('email').value;
    resetPassword.password=this.resetPasswordForm.get('password').value;
    this.subscriptions.push(
      this.userService.resetPassword(resetPassword).subscribe(
        (response : CustomHttpResponse) => {
          this.router.navigateByUrl('/odzyskaj-haslo/potwierdzenie');
        },
        (err: HttpErrorResponse) => {
          this.errorMessage=err.error.message;
          this.isResetPasswordFailed=true;
        }
      )
    );
  }

  isEmailAbsent(): boolean {
    return this.errorMessage?.includes('No user found by email:');
  }

  displayValidationError(control: AbstractControl) {
    return control.invalid  && control.touched && control.dirty;
  }

  passwordTouched(control: AbstractControl) {
    return control.touched && control.dirty;
  }

  onResetForm(){
    console.log('Inside reset')
    this.resetPasswordForm.reset();
    this.isResetPasswordFailed=false;
  }
}
