import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;
  totalElements: number = 0;
  totalPages: number = 0;
  isAdmin: boolean = false;
  isAdminOrModerator: boolean = false;
  keyword: string = '';

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdminOrModerator = this.authService.isAdminOrModerator();
    this.isAdmin = this.authService.isAdmin();
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.userService.getUsers(this.pageNumber-1, this.pageSize).subscribe(
      this.processUsersResults()
    )
  }

  findUsersByKeyword(keyword: string) {
    this.userService.getUserListByKeyword(keyword,this.pageNumber-1, this.pageSize)
      .subscribe(this.processUsersResults());
    this.keyword=keyword;
  }

  deleteUser(user: User) {
    if(confirm(`Czy na pewno chcesz usunąć użytkownika: ${user.email}? Przywrócenie użytkownika po usunięciu nie będzie możliwe`)) {
      this.userService.deleteUser(user.email).subscribe({
          next: () => this.retrieveUsers()
        }
      );
    }
  }

  resetKeyword() {
    this.keyword='';
    this.retrieveUsers();
  }

  updatePageSize(pageSize: number) {
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.retrieveUsers();
  }

  changePage() {
    this.retrieveUsers()
  }

  private processUsersResults() {
    return data => {
      this.users=data.content;
      this.pageSize=data.pageable.pageSize;
      this.pageNumber=data.pageable.pageNumber+1;
      this.totalElements=data.totalElements;
      this.totalPages=data.totalPages;      
    }
  }

}
