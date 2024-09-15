import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Comment } from '../../models/app.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.sass',
})
export class CommentListComponent {
  @Input() postId!: number;
  comments$: Observable<Comment[]>;
  constructor(private api: ApiService) {
    this.comments$ = this.api.getPostComments(this.postId);
  }

  ngOnChanges() {
    this.comments$ = this.api.getPostComments(this.postId);
  }
}
