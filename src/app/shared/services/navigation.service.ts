import { Injectable } from '@angular/core';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  updatePagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    sessionStorage.setItem("homePageNumber", theCurrentPageNumber.toString());
    sessionStorage.setItem("homePageSize", theCurrentPageSize.toString());
  }

  updatePromoPagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    sessionStorage.setItem("promoPageNumber", theCurrentPageNumber.toString());
    sessionStorage.setItem("promoPageSize", theCurrentPageSize.toString());
  }

  updateAdminPagination(theCurrentPageNumber: number, theCurrentPageSize: number) {
    sessionStorage.setItem("adminPageNumber", theCurrentPageNumber.toString());
    sessionStorage.setItem("adminPageSize", theCurrentPageSize.toString());
  }

  resetPagination() {
    sessionStorage.setItem("homePageNumber", "1")
    sessionStorage.setItem("homePageSize", "24")
  }

  getPageNumber(itemName: string) : number {
    let pageNumber = sessionStorage.getItem(itemName)
    if(pageNumber) {
      return parseInt(pageNumber);
    } else {
      return 1;
    }
  }

  getPageSize(itemName: string, defaultSize: number): number {
    let pageSize = sessionStorage.getItem(itemName)
    if(pageSize) {
      return parseInt(pageSize);
    } else {
      return defaultSize;
    }
  }
}
