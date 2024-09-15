import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { CardComponent } from '../../components/card/card.component';
import { Post } from '../../models/app.model';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    PostCardComponent,
    CommentListComponent,
    CardComponent,
    AsyncPipe,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  post$!: Observable<Post>;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const postId = params.get('id');
        return this.api.getSinglePost(Number(postId));
      })
    );
  }
}
