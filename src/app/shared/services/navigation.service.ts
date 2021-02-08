import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  currentPageNumber=1;
  currentPageSize=24;

  constructor() { }

  updatePagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    this.currentPageNumber=theCurrentPageNumber;
    this.currentPageSize=theCurrentPageSize;
  }

  get pageNumber() {
    return this.currentPageNumber;
  }

  get pageSize() {
    return this.currentPageSize;
  }
}
