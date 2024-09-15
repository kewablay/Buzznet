import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Comment } from '../../models/app.model';
import { SkeletonModule } from 'primeng/skeleton';
import { CommentSkeletonComponent } from "../skeletons/comment-skeleton/comment-skeleton.component";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CardComponent, AsyncPipe, SkeletonModule, CommentSkeletonComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.sass',
})
export class CommentListComponent {
  @Input() postId!: number;
  comments$: Observable<Comment[]>;

  mockCommentForLoading = [...Array(3)]
  constructor(private api: ApiService) {
    this.comments$ = this.api.getPostComments(this.postId);
  }

  ngOnChanges() {
    this.comments$ = this.api.getPostComments(this.postId);
  }
}
