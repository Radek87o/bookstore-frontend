import { Book } from './book';

export class AuthorWrapper {
    id: string;
    firstName: string;
    lastName: string;
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
