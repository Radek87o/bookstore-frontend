import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressDto } from '../../model/dto/address-dto';
import { SignupDto } from '../../model/dto/signup-dto';
import { AuthService } from '../../services/auth.service';
import { BookStoreValidators } from '../../utils/book-store-validators';
import { ZipCodeControl } from '../../utils/zip-code-control';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private emailPattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$";
  private passwordPattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()])[A-Za-z\\d@$!%*?&#^()]{8,}$"
  private zipCodePattern = "^(\\d{2}-\\d{3})$";
  isSuccessfullyRegistered: boolean = false;
  isSignUpFailed: boolean=false;
  showAddressForm: boolean = false;
  errorMessage: string ='';

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(30),
      BookStoreValidators.notOnlyWhitespace]),
    lastName: new FormControl('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(30),
      BookStoreValidators.notOnlyWhitespace]),
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    street: new FormControl('', []),
    city: new FormControl('', []),
    locationNumber: new FormControl('', []),
    zipCode: new ZipCodeControl('', [Validators.pattern(this.zipCodePattern)])  
  },{validators: [BookStoreValidators.passwordsNonMatching, BookStoreValidators.nonCompletedAddress]});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let signup = new SignupDto();
    signup.firstName=this.registerForm.get('firstName').value;
    signup.lastName=this.registerForm.get('lastName').value;
    let username = this.registerForm.get('username').value
    signup.username=username==='' ? null : username;
    signup.email=this.registerForm.get('email').value;
    signup.password=this.registerForm.get('password').value;
    signup.address=this.populateAddress();
    this.authService.register(signup).subscribe(
      data => {
          this.isSuccessfullyRegistered = true;
          this.isSignUpFailed = false;
          this.router.navigateByUrl('/rejestracja/potwierdzenie');
        },
        err => {   
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }

  populateAddress() {
    let address = new AddressDto();
    address.city = this.registerForm.get('city').value;
    address.street = this.registerForm.get('street').value;
    address.locationNumber = this.registerForm.get('locationNumber').value;
    address.zipCode = this.registerForm.get('zipCode').value;
    if(!address.city && !address.street && ! address.locationNumber && !address.zipCode) {
      return null;
    } else {
      return address;
    }
  }

  isUsernameTaken() {
    return this.errorMessage?.includes(`Username already taken`)
  }

  isEmailTaken() {
    return this.errorMessage?.includes(`Email already has account`)
  }

  changeAddressDataVisibility(event: any) {
    this.showAddressForm = event.target.checked;
  }

  displayValidationError(control: AbstractControl) {
    return control.invalid  && control.touched && control.dirty;
  }

  passwordTouched(control: AbstractControl) {
    return control.touched && control.dirty;
  }

  onResetForm() {
    this.registerForm.reset();
    this.isSignUpFailed=false;
  }
}
