import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { CardComponent } from '../../components/card/card.component';
import { Post, PostData, PostWithComments } from '../../models/app.model';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { SkeletonModule } from 'primeng/skeleton';
import { PostSkeletonComponent } from '../../components/skeletons/post-skeleton/post-skeleton.component';
import { Store } from '@ngrx/store';
import { selectPostById, selectPostLoading } from '../../store/post-selectors/post.selectors';
import { updatePost } from '../../store/post-actions/post.actions';
import { CommentSkeletonComponent } from "../../components/skeletons/comment-skeleton/comment-skeleton.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    PostCardComponent,
    CommentListComponent,
    CardComponent,
    AsyncPipe,
    DialogModule,
    ButtonModule,
    PostFormComponent,
    SkeletonModule,
    PostSkeletonComponent,
    CommentSkeletonComponent
],

  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  singlePost$!: Observable<PostWithComments | undefined>;
  visible: boolean = false;
  postLoading$: Observable<boolean>;
  mockCommentForLoading = [...Array(3)];

  constructor(private route: ActivatedRoute, private store: Store) {
    this.singlePost$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const postId = params.get('id');
        return this.store.select(selectPostById(Number(postId)));
      })
    );

    this.postLoading$ = this.store.select(selectPostLoading);
  }

  showDialog() {
    this.visible = true;
  }
  closeModal() {
    this.visible = false;
  }

  editPost(postData: any) {
    console.log('new post data: ', postData);
    this.store.dispatch(updatePost({ postData }));
    this.closeModal();
  }
}
