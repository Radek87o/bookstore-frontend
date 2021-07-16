import {Address} from './address'
import { Comment } from './comment';
import { Rating } from './rating';

export class User {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    profileImageUrl: string;
    createdDate: Date;
    lastUpdateDate: Date;
    lastLoginDate: Date;
    role: string;
    authorities: string;
    active: boolean;
    notLocked: boolean;
    address: Address;
    comments: Comment[];
    ratings: Rating[];

    constructor() {

    }
}
