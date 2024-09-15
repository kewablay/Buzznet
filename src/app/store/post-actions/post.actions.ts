import { createAction, props } from '@ngrx/store';
import { Post, PostData, PostWithComments } from '../../models/app.model';

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success, ',
  props<{ posts: PostWithComments[] }>()
);
export const loadPostsError = createAction(
  '[Posts] Load Post Errror',
  props<{ error: any }>()
);


// CREAT 
export const createPost = createAction('[Post] Create Post', props<{postData: PostData}>());
export const createPostSuccess = createAction('[Post] Create Post Success');
export const createPostError = createAction('[Post] Create Post Error', props<{error: any}>())

// UPDATE 
export const updatePost = createAction('[Post] Update Post', props<{postData: Post}>());
export const updatePostSuccess = createAction('[Post] Update Post Success');
export const updatePostError = createAction('[Post] Update Post Error', props<{error: any}>())


// DELETE
export const deletePost  = createAction('[Post] DeletePost', props<{postId: number}> ())
export const deletePostSuccess = createAction('[Post] DeletePost Success');
export const deletePostError = createAction('[Post] DeletePost Error', props<{error: any}>())
