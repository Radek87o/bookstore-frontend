import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookDto } from 'src/app/shared/model/dto/book-dto';
import { Category } from 'src/app/shared/model/category';
import { CategoryService } from '../../shared/services/category.service';
import { AuthorDto } from 'src/app/shared/model/dto/author-dto';
import { BookService } from 'src/app/shared/services/book.service';
import { BookStoreValidators } from '../../shared/utils/book-store-validators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from 'src/app/shared/model/book';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  categories: Category[] = [];
  bookCategories: Category[] = [];
  bookAdded: boolean = false;
  bookAddedInvalid: boolean = false;
  editMode: boolean = false;
  editedBook: Book=new Book();
  title: string = '';
  private urlReg ='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      BookStoreValidators.notOnlyWhitespace
    ]),
    subtitle: new FormControl('', 
            [Validators.minLength(2)]),
    authorFirstName: new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(30), 
      BookStoreValidators.notOnlyWhitespace]),
    authorLastName: new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(30), 
      BookStoreValidators.notOnlyWhitespace
    ]),
    description: new FormControl('', [
      Validators.required, 
      Validators.minLength(200), 
      Validators.maxLength(2000),
      BookStoreValidators.notOnlyWhitespace
    ]),
    imageUrl: new FormControl('', 
                            [Validators.pattern(this.urlReg)]),
    issueYear: new FormControl(this.editedBook ? this.editedBook.issueYear : '', [Validators.required, Validators.min(2000), Validators.max(2022)]),
    pages: new FormControl('', [Validators.min(1), Validators.max(9999)]),
    isHardcover: new FormControl(null, [Validators.required]),
    basePrice: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999.99)]),
    promoPrice: new FormControl('', [Validators.min(0), Validators.max(999.99)]),
    active: new FormControl(true, []),
    unitsInStock: new FormControl('', [Validators.max(9999), Validators.min(0), Validators.required]),
    categories: new FormControl('', [Validators.required])
  })

  

  constructor(private categoryService: CategoryService, 
              private bookService: BookService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(
      response=>{
        this.categories=response;
      }
    )
    this.editMode = this.route.snapshot.paramMap.has('bookId');
    if(this.editMode) {
      const bookEdited: Observable<Book> = this.route.paramMap.pipe(
        switchMap((params: ParamMap)=>{
            return this.bookService.getBook(params.get('bookId'));
        })
      );
      bookEdited.subscribe(data => {
        this.editedBook = data;
        this.bookCategories = data.categories;
        this.populateBookForm()
      });
    }
  }

  populateBookForm() {
    this.bookForm = new FormGroup({
      title: new FormControl(this.editedBook ? this.editedBook.title : '', [
        Validators.required, 
        Validators.minLength(2), 
        BookStoreValidators.notOnlyWhitespace
      ]),
      subtitle: new FormControl(this.editedBook ? this.editedBook.subtitle : '', [Validators.minLength(2)]),
      authorFirstName: new FormControl(this.editedBook.author ? this.editedBook.author.firstName : '', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(30), 
        BookStoreValidators.notOnlyWhitespace]),
      authorLastName: new FormControl(this.editedBook.author ? this.editedBook.author.lastName : '', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(30), 
        BookStoreValidators.notOnlyWhitespace
      ]),
      description: new FormControl(this.editedBook ? this.processDescription(this.editedBook.description) : '', [
        Validators.required, 
        Validators.minLength(200), 
        Validators.maxLength(2000),
        BookStoreValidators.notOnlyWhitespace
      ]),
      imageUrl: new FormControl(this.editedBook ? this.editedBook.imageUrl : '', 
                              [Validators.pattern(this.urlReg)]),
      issueYear: new FormControl(this.editedBook ? this.editedBook.issueYear : '', [Validators.required, Validators.min(2000), Validators.max(2022)]),
      pages: new FormControl(this.editedBook ? this.editedBook.pages : '', [Validators.min(1), Validators.max(9999)]),
      isHardcover: new FormControl(this.editedBook ? this.editedBook.hardcover : null, [Validators.required]),
      basePrice: new FormControl(this.editedBook ? this.editedBook.basePrice : '', [Validators.required, Validators.min(0), Validators.max(999.99)]),
      promoPrice: new FormControl(this.editedBook ? this.editedBook.promoPrice : '', [Validators.min(0), Validators.max(999.99)]),
      active: new FormControl(this.editedBook ? this.editedBook.active : true, []),
      unitsInStock: new FormControl(this.editedBook ? this.editedBook.unitsInStock : '', [Validators.max(9999), Validators.min(0), Validators.required]),
      categories: new FormControl(this.editedBook ? this.editedBook.categories : '', [Validators.required])
    })
  }

  processDescription(descriptionArray: string[]) {
    return descriptionArray.join("\n\n");
  }

  isCurrentBookCategory(category: Category) {
    if(!this.bookCategories) {
      return false;
    }
    let foundCategories = this.bookCategories.filter(bookCategory => bookCategory.id===category.id)
    
    return foundCategories.length>0;
  }

  modifyBookCategories(selectedCategoryId: string) {
    let categoryId=this.extractCategoryId(selectedCategoryId);
    let categoryToAdd = new Category() 
    this.categories.forEach(category=> {
      if(category.id===categoryId) {
        categoryToAdd=category;
      }
    });
    if(!this.isCurrentBookCategory(categoryToAdd) && categoryToAdd.name) {
      this.bookCategories.push(categoryToAdd);
    }
    this.bookForm.get('categories').setValue(this.bookCategories);
  }

  extractCategoryId(selectedCategoryId: string) {
    return selectedCategoryId
                    .substring(selectedCategoryId.lastIndexOf(':')+1, selectedCategoryId.lastIndexOf('\''))
                    .trim()
                    .replace('\'','');
  }

  removeBookCategory(bookCategory: Category) {
    this.bookCategories.forEach((category, index) => {
      if(category===bookCategory) {
        this.bookCategories.splice(index,1)
      }
    })
  }

  onSubmit(){
    let bookToSave = this.populateBookToSave();
    if(this.editMode) {
      this.updateExistingBook(bookToSave, this.editedBook.id);
    } else {
      this.saveNewBook(bookToSave);
    }
  }

  private saveNewBook(bookToSave: BookDto) {
    this.bookService.saveBook(bookToSave).subscribe(
      {
        next: response => {
          this.bookForm.reset();
          this.bookAdded = true;
        },
        error: err => {
          this.bookAddedInvalid = true;
        }
      }
    );
  }

  private updateExistingBook(bookToUpdate: BookDto, bookId: string) {
    this.bookService.updateBook(bookToUpdate, bookId).subscribe(
      {
        next: response => {
          this.bookAdded = true;
        },
        error: err => {
          this.bookAddedInvalid = true;
        }
      }
    );
  }

  populateBookToSave(): BookDto {
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
    bookToSave.basePrice=this.determinePrice('basePrice');
    if(this.bookForm.get('promoPrice').value){
      bookToSave.promoPrice=this.determinePrice('promoPrice');
    }
    bookToSave.active=this.bookForm.get('active').value;
    bookToSave.hardcover=this.bookForm.get('isHardcover').value;
    bookToSave.pages=this.bookForm.get('pages').value;
    bookToSave.unitsInStock=this.bookForm.get('unitsInStock').value;
    bookToSave.categories=this.bookForm.get('categories').value;
    return bookToSave;
  }

  determinePrice(priceVariableName: string) {
    let priceValue = this.bookForm.get(priceVariableName).value;
    if(typeof priceValue==='string') {
      return priceValue.replace(',','.');
    } else {
      return priceValue;
    }
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
