import { Author } from './author';
import { Category } from './category';

export class Book {
    id: string;
    title: string;
    subtitle?: string;
    description?: string[];
    imageUrl: string;
    author: Author;
    basePrice: number;
    promoPrice: number;
    active: boolean;
    unitsInStock: number;
    createdDate: Date;
    lastUpdateDate: Date;
    hardcover?: boolean;
    pages?: number;
    issueYear: number;
    categories?: Category[];
}
