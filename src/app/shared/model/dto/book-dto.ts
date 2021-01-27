import { AuthorDto } from '../dto/author-dto';
import { Category } from '../category';

export class BookDto {
    title: string;
    subtitle: string;
    description: string[];
    imageUrl: string;
    author: AuthorDto;
    basePrice: number;
    promoPrice?: number;
    active: boolean;
    unitsInStock: number;
    hardcover: boolean;
    pages?: number;
    issueYear: number;
    categories: Category[];
}
