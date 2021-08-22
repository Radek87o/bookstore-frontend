import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  isAdminOrModerator: boolean = false;
  isAdmin: boolean = false;
  showAddressForm: boolean = false;
  addingUserFailed: boolean = false;
  errorMessage: string ='';
  editMode: boolean = false;
  editedUser: User = new User();
  
  addUserForm: FormGroup = new FormGroup({
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
    email: new FormControl('', [Validators.required, Validators.pattern(Patterns.EMAIL_PATTERN)]),
    active: new FormControl(true, []),
    notLocked: new FormControl(true, []),
    role: new FormControl(null, []),
    street: new FormControl('', []),
    city: new FormControl('', []),
    locationNumber: new FormControl('', []),
    zipCode: new ZipCodeControl('', [Validators.pattern(Patterns.ZIP_CODE_PATTERN)])  
  },{validators: [BookStoreValidators.passwordsNonMatching, BookStoreValidators.nonCompletedAddress]});

  constructor(private authService: AuthService,
             private userService: UserService, 
             private router: Router,
             private route: ActivatedRoute, 
             private notifier: NotificationsService) { }

  ngOnInit(): void {
    this.isAdminOrModerator = this.authService.isAdminOrModerator();
    this.isAdmin = this.authService.isAdmin();
    this.editMode = this.route.snapshot.paramMap.has('userId');
    if(this.editMode) {
      const userEdited: Observable<User> = this.route.paramMap.pipe(
        switchMap((params: ParamMap)=>{
            return this.userService.getUser(params.get('userId'));
        })
      );
      userEdited.subscribe(data => {
        this.editedUser = data;
        if(this.editedUser.address) {
          this.showAddressForm = true;
        }
        this.populateUserForm();
      });
    }
  }

  onSubmit() {
    let signup = this.populateUserToSave();
    let active = this.addUserForm.get('active').value;
    let nonLocked = this.addUserForm.get('notLocked').value;
    let role = this.addUserForm.get('role').value;
    signup.address=this.populateAddress();
    if(this.editMode) {
      this.updateExistingUser(signup, String(active), String(nonLocked), role, this.editedUser.id)
    } else {
      this.addNewUser(signup, String(active), String(nonLocked), role);
    }
  }

  addNewUser(user: SignupDto, active: string, notLocked: string, role: string) {
    this.userService.addNewUser(user, active, notLocked, role).subscribe(
      data => {
          this.notifier.addSuccess("Użytkownik poprawnie dodany do bazy danych")
          this.addingUserFailed = false;
          this.router.navigateByUrl('/admin/uzytkownicy');
        },
        err => {   
          this.errorMessage = err.error.message;
          this.addingUserFailed = true;
        }
    );
  }

  updateExistingUser(user: SignupDto, active: string, notLocked: string, role: string, userId: string) {
    this.userService.updateUser(user, active, notLocked, role, userId).subscribe(
      data => {
          this.notifier.addSuccess("Dane użytkownika poprawnie zmodyfikowane")
          this.addingUserFailed = false;
          this.router.navigateByUrl('/admin/uzytkownicy');
        },
        err => {   
          this.errorMessage = err.error.message;
          this.addingUserFailed = true;
        }
    );
  }

  populateUserForm() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(this.editedUser?.firstName,[
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        BookStoreValidators.notOnlyWhitespace]),
      lastName: new FormControl(this.editedUser?.lastName, [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        BookStoreValidators.notOnlyWhitespace]),
      username: new FormControl(this.editedUser?.username ? this.editedUser.username : '', [Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl({value: this.editedUser?.email, disabled: this.editMode}, [Validators.required, Validators.pattern(Patterns.EMAIL_PATTERN)]),
      active: new FormControl(this.editedUser?.active ? this.editedUser.active : true, []),
      notLocked: new FormControl(this.editedUser?.notLocked ? this.editedUser.notLocked : true, []),
      role: new FormControl(this.transformRole(this.editedUser?.role), []),
      street: new FormControl(this.editedUser?.address ? this.editedUser?.address.street :'', []),
      city: new FormControl(this.editedUser?.address ? this.editedUser?.address.city :'', []),
      locationNumber: new FormControl(this.editedUser?.address ? this.editedUser?.address.locationNumber :'', []),
      zipCode: new ZipCodeControl(this.editedUser?.address ? this.editedUser?.address.zipCode :'', [Validators.pattern(Patterns.ZIP_CODE_PATTERN)])  
    },{validators: [BookStoreValidators.passwordsNonMatching, BookStoreValidators.nonCompletedAddress]});
  }

  populateUserToSave() {
    let signup = new SignupDto();
    signup.firstName=this.addUserForm.get('firstName').value;
    signup.lastName=this.addUserForm.get('lastName').value;
    let username = this.addUserForm.get('username').value
    signup.username=username==='' ? null : username;
    signup.email=this.addUserForm.get('email').value;
    signup.address=this.populateAddress();
    return signup;
  }

  populateAddress() {
    let address = new AddressDto();
    address.city = this.addUserForm.get('city').value;
    address.street = this.addUserForm.get('street').value;
    address.locationNumber = this.addUserForm.get('locationNumber').value;
    address.zipCode = this.addUserForm.get('zipCode').value;
    if(!address.city && !address.street && !address.locationNumber && !address.zipCode) {
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

  onResetForm() {
    this.addUserForm.reset();
    if(this.editMode) {
      this.populateUserForm();
    }
    this.addingUserFailed=false;
  }

  private transformRole(rawRole: string) {
    let role = rawRole ? rawRole : '';
    return role.replace("ROLE_","").toLocaleLowerCase();
  }
}
