import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { CommentDto } from '../../model/dto/comment-dto';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {

  private userId: string  = '408a2c8b-ea95-4c81-b952-2e4a124a1b50';
  
  commentSaved: boolean = false; 
  commentSavedError: boolean = false; 

  commentsForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)])
  }) 

  constructor(private commentService: CommentService, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSubmit(){
    let commentDto = new CommentDto();
    commentDto.content=this.commentsForm.get('content').value;
    const bookId=this.route.snapshot.paramMap.get('id');
    this.commentService.saveComment(commentDto, bookId, this.userId).subscribe({
      next: response => {
        this.commentSaved=true;
        this.commentsForm.reset();
      },
      error: err => {
        alert(`Wystąpił problem przy próbie zapisania komentarza: ${err}`);
        this.commentSaved=true;  
      }
    });
  }

}
