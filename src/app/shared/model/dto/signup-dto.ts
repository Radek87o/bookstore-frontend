import { AddressDto } from "./address-dto";

export class SignupDto {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address: AddressDto;
}
