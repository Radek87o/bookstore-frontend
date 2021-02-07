import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../../model/comment';
import { CommentDto } from '../../model/dto/comment-dto';
import { CommentListResponse, CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  private userId: string  = '408a2c8b-ea95-4c81-b952-2e4a124a1b50';
  
  bookComments: Comment[]=[];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  commentSaved: boolean = false; 
  commentSavedError: boolean = false; 

  commentsForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)])
  }) 

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookCommentsPage();
  }

  getBookCommentsPage() {
    const commentsListObservable: Observable<CommentListResponse> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.commentService.getCommentsByBook(params.get('id'), this.pageNumber-1)
      })
    )

    commentsListObservable.subscribe(
      data => {
        this.bookComments=data.content;
        this.pageNumber=data.pageable.pageNumber+1;
        this.pageSize=data.pageable.pageSize;
        this.totalElements=data.totalElements;
        this.totalPages=data.totalPages;
      }
    );
  }

  onSubmit(){
    let commentDto = new CommentDto();
    commentDto.content=this.commentsForm.get('content').value;
    const bookId=this.route.snapshot.paramMap.get('id');
    this.commentService.saveComment(commentDto, bookId, this.userId).subscribe({
      next: response => {
        this.commentSaved=true;
        this.commentsForm.reset();
        this.pageNumber=1;
        this.getBookCommentsPage();
      },
      error: err => {
        alert(`Wystąpił problem przy próbie zapisania komentarza: ${err}`);
        this.commentSavedError=true;  
      }
    });
  }
}
