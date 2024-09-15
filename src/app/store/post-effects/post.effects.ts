import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createPost,
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from '../post-actions/post.actions';
import { catchError, combineLatest, map, switchMap } from 'rxjs';
import { CacheService } from '../../services/cache.service';

@Injectable()
export class PostEffects {
  constructor(
    private api: ApiService,
    store: Store,
    private actions$: Actions,
    private cacheService: CacheService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.api
          .getPosts()
          .pipe(
            switchMap((posts) =>
              combineLatest(
                posts.map((post) =>
                  this.api
                    .getPostComments(post.id)
                    .pipe(map((comments) => ({ ...post, comments })))
                )
              ).pipe(
                map((postsWithComments) =>
                  loadPostsSuccess({ posts: postsWithComments })
                )
              )
            )
          )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      switchMap(({ postData }) =>
        this.api.createPost(postData).pipe(
          map(() => createPostSuccess()),
          catchError((error) => [createPostError({ error })])
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap(({ postData }) =>
        this.api.udpatePost(postData).pipe(
          map(() => updatePostSuccess()),
          catchError((error) => [updatePostError({ error })])
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap(({ postId }) =>
        this.api.deletePost(postId).pipe(
          map(() => deletePostSuccess()),
          catchError((error) => [deletePostError({ error })])
        )
      )
    )
  );
}
