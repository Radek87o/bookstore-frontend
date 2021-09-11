import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { Patterns } from 'src/app/shared/model/constants/patterns';
import { AddressDto } from 'src/app/shared/model/dto/address-dto';
import { SignupDto } from 'src/app/shared/model/dto/signup-dto';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BookStoreValidators } from 'src/app/shared/utils/book-store-validators';
import { ZipCodeControl } from 'src/app/shared/utils/zip-code-control';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  loggedUser: User;
  loggedIn: boolean;
  editCurrentUserForm: FormGroup;
  isAddressGiven: boolean;
  showAddressForm: boolean = false;
  userEditionFailed: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, 
              private userService: UserService,
              private notifier: NotificationsService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getUserFromLocalCache();
    this.loggedIn = this.authService.isLoggedIn();
    this.populateCurrentUserForm();
    this.isAddressGiven = this.keepAddressVisible();
    if(this.loggedUser.address) {
      this.showAddressForm = true;
    }
  }

  populateCurrentUserForm() {
    this.editCurrentUserForm = new FormGroup({
      firstName: new FormControl(this.loggedUser?.firstName,[
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        BookStoreValidators.notOnlyWhitespace]),
      lastName: new FormControl(this.loggedUser?.lastName, [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        BookStoreValidators.notOnlyWhitespace]),
      username: new FormControl(this.loggedUser?.username ? this.loggedUser.username : '', [Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl({value: this.loggedUser?.email, disabled: true}, [Validators.required, Validators.pattern(Patterns.EMAIL_PATTERN)]),
      role: new FormControl({value: this.userService.transformRole(this.loggedUser?.role), disabled: true}, []),
      street: new FormControl(this.loggedUser?.address ? this.loggedUser?.address.street :'', []),
      city: new FormControl(this.loggedUser?.address ? this.loggedUser?.address.city :'', []),
      locationNumber: new FormControl(this.loggedUser?.address ? this.loggedUser?.address.locationNumber :'', []),
      zipCode: new ZipCodeControl(this.loggedUser?.address ? this.loggedUser?.address.zipCode :'', [Validators.pattern(Patterns.ZIP_CODE_PATTERN)])  
    },{validators: [BookStoreValidators.passwordsNonMatching, BookStoreValidators.nonCompletedAddress]});
  }

  onSubmit() {
    let user = this.defineUser();
    this.userService.updateOwnAccount(user, this.loggedUser.id)
      .subscribe(
        (response)=>{
          this.notifier.addSuccess('Twoje dane zostały nadpisane')
          this.userEditionFailed=false;
          this.authService.addUserToLocalCache(response);
          this.loggedUser = this.authService.getUserFromLocalCache();
          this.populateCurrentUserForm();
        },
        err => {
          this.errorMessage = err.error.message;
          this.userEditionFailed = true;
        }
      );
  }

  isUsernameTaken() {
    return this.errorMessage?.includes(`Username already taken`)
  }

  changeAddressDataVisibility(event: any) {
    this.showAddressForm = event.target.checked;
  }

  resetForm() {
    this.editCurrentUserForm.reset();
    this.populateCurrentUserForm();
    this.userEditionFailed=false;
  }

  populateRole(user: User) {
    if(user.role==='ROLE_ADMIN') {
      return 'ADMINISTRATOR';
    }
    if(user.role==='ROLE_MODERATOR') {
      return 'MODERATOR';
    }
    else {
      return 'UŻYTKOWNIK'
    }
  }

  private defineUser() {
    let signup = new SignupDto();
    signup.firstName=this.editCurrentUserForm.get('firstName').value;
    signup.lastName=this.editCurrentUserForm.get('lastName').value;
    let username = this.editCurrentUserForm.get('username').value
    signup.username=username==='' ? null : username;
    signup.email=this.editCurrentUserForm.get('email').value;
    signup.address=this.populateAddress();
    return signup;
  }

  private populateAddress() {
    let address = new AddressDto();
    address.city = this.editCurrentUserForm.get('city').value;
    address.street = this.editCurrentUserForm.get('street').value;
    address.locationNumber = this.editCurrentUserForm.get('locationNumber').value;
    address.zipCode = this.editCurrentUserForm.get('zipCode').value;
    if(!address.city && !address.street && !address.locationNumber && !address.zipCode) {
      return null;
    } else {
      return address;
    }
  }

  private keepAddressVisible() {
    let address = this.loggedUser.address;
    if(!address?.city && !address?.street && !address?.locationNumber && !address?.zipCode) {
      return false;
    } else {
      return true;
    }
  }
}
