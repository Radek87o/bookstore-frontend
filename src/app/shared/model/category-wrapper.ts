import { Book } from '../model/book';

export class CategoryWrapper {
    id: string;
    name: string;
    books: {
      content: Book[];
      totalElements: number;
      totalPages: number;
      pageable: {
        pageNumber: number;
        pageSize: number;
      }
    }    
}
