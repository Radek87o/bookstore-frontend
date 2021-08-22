export class Patterns {
    static ZIP_CODE_PATTERN : string = "^(\\d{2}-\\d{3})$";
    static EMAIL_PATTERN: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$";
    static PASSWORD_PATTERN: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()])[A-Za-z\\d@$!%*?&#^()]{8,}$"
}
