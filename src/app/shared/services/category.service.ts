import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { CategoryWrapper } from '../model/category-wrapper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  getCategoriesList():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryBooks(categoryId: string, page: number, size: number) : Observable<CategoryWrapper>  {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('page', pageParam)
                  .set('size', sizeParam);
    return this.http.get<CategoryWrapper>(`${this.baseUrl}/${categoryId}`, {params: params})
  }
}
