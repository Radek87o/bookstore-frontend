import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookDto } from 'src/app/shared/model/dto/book-dto';
import { Category } from 'src/app/shared/model/category';
import { CategoryService } from '../../shared/services/category.service';
import { AuthorDto } from 'src/app/shared/model/dto/author-dto';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  categories: Category[] = [];
  bookAdded: boolean = false;
  bookAddedInvalid: boolean = false;
  private urlReg ='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    subtitle: new FormControl('', [Validators.minLength(2)]),
    authorFirstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    authorLastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.minLength(200), Validators.maxLength(2000)]),
    imageUrl: new FormControl('', [Validators.pattern(this.urlReg)]),
    issueYear: new FormControl('', [Validators.required, Validators.min(2000), Validators.max(2022)]),
    pages: new FormControl('', [Validators.min(1), Validators.max(9999)]),
    isHardcover: new FormControl(null, [Validators.required]),
    basePrice: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999.99)]),
    promoPrice: new FormControl('', [Validators.min(0), Validators.max(999.99)]),
    active: new FormControl(true, []),
    unitsInStock: new FormControl('', [Validators.max(9999), Validators.min(0), Validators.required]),
    categories: new FormControl('', [Validators.required])
  })

  constructor(private categoryService: CategoryService, private bookService: BookService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(
      response=>{
        this.categories=response;
      }
    )
  }

  onSubmit(){
    let authorDto = new AuthorDto();
    authorDto.firstName = this.bookForm.get('authorFirstName').value;
    authorDto.lastName = this.bookForm.get('authorLastName').value;
    
    let bookToSave = new BookDto();
    bookToSave.title = this.bookForm.get('title').value;
    bookToSave.subtitle=this.bookForm.get('subtitle').value;
    if(bookToSave.subtitle===''){
      bookToSave.subtitle=null;
    }
    bookToSave.author = authorDto;
    bookToSave.imageUrl=this.bookForm.get('imageUrl').value;
    bookToSave.issueYear=this.bookForm.get('issueYear').value;
    bookToSave.description=this.bookForm.get('description').value;
    bookToSave.basePrice=this.bookForm.get('basePrice').value.replace(',','.');
    if(this.bookForm.get('promoPrice').value){
      bookToSave.promoPrice=this.bookForm.get('promoPrice').value.replace(',','.');
    }
    bookToSave.active=this.bookForm.get('active').value;
    bookToSave.hardcover=this.bookForm.get('isHardcover').value;
    bookToSave.pages=this.bookForm.get('pages').value;
    bookToSave.unitsInStock=this.bookForm.get('unitsInStock').value;
    bookToSave.categories=this.bookForm.get('categories').value;
    console.log(bookToSave);
    this.bookService.saveBook(bookToSave).subscribe(
      {
        next: response => {
          this.bookForm.reset();
          this.bookAdded=true;
        },
        error: err => {
          this.bookAddedInvalid=true;
        }
      } 
    );
  }

  isFormInvalid(control: any){
    const {dirty, touched, errors} = control;
    return dirty && touched && errors;
  }

  onResetForm(){
    this.bookForm.reset();
    this.bookAddedInvalid=false;
  }
}
