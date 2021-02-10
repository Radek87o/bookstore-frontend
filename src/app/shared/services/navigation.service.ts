import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentPageNumber=1;
  private currentPageSize=24;

  private currentPromoPageNumber=1;
  private currentPromoPageSize=24;

  constructor() { }

  updatePagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    this.currentPageNumber=theCurrentPageNumber;
    this.currentPageSize=theCurrentPageSize;
  }

  updatePromoPagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    this.currentPromoPageNumber=theCurrentPageNumber;
    this.currentPromoPageSize=theCurrentPageSize;
  }

  get pageNumber() {
    return this.currentPageNumber;
  }

  get pageSize() {
    return this.currentPageSize;
  }

  get promoPageNumber() {
    return this.currentPromoPageNumber;
  }

  get promoPageSize() {
    return this.currentPromoPageSize;
  }
}
