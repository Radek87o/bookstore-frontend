import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../model/comment';
import { CommentDto } from '../../model/dto/comment-dto';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  private userId: string  = '408a2c8b-ea95-4c81-b952-2e4a124a1b50';
  
  bookComments: Comment[];
  commentSaved: boolean = false; 
  commentSavedError: boolean = false; 

  commentsForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)])
  }) 

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  //todo - paginacja - zamiast wbitych na stałe komentarzy

  ngOnInit(): void {
    const bookId=this.route.snapshot.paramMap.get('id');
    this.getBookCommments(bookId);
  }

  getBookCommments(bookId: string) {
    this.commentService.getCommentsByBook(bookId, 0, 10).subscribe(
      data => {
        this.bookComments=data;
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
        this.getBookCommments(bookId);
      },
      error: err => {
        alert(`Wystąpił problem przy próbie zapisania komentarza: ${err}`);
        this.commentSaved=true;  
      }
    });
  }
}
