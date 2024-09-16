import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { CardComponent } from '../card/card.component';
import { Post, PostWithComments } from '../../models/app.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { PostSkeletonComponent } from '../skeletons/post-skeleton/post-skeleton.component';
import { Store } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  selectAllPosts,
  selectPostError,
  selectPostLoading,
} from '../../store/post-selectors/post.selectors';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostCardComponent,
    CardComponent,
    AsyncPipe,
    RouterLink,
    SkeletonModule,
    PostSkeletonComponent,
    NgxPaginationModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  mockPostForLoading = [...Array(3)];

  postLoading$: Observable<boolean>;
  postError$!: Observable<any>;
  p: number = 1;

  allPosts$: Observable<PostWithComments[]>;
  constructor(private store: Store) {
    this.allPosts$ = this.store.select(selectAllPosts);
    this.postLoading$ = this.store.select(selectPostLoading);
    this.postError$ = this.store.select(selectPostError);
  }
}
