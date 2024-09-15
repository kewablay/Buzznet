import { createReducer, on } from '@ngrx/store';
import { PostWithComments } from '../../models/app.model';
import { InitialPostState, PostAdapter } from '../post-state/post.state';
import {
  createPost,
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  loadPosts,
  loadPostsError,
  loadPostsSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from '../post-actions/post.actions';

export const PostReducer = createReducer(
  InitialPostState,
  on(loadPosts, (state) => ({ ...state, loading: true })),
  on(loadPostsSuccess, (state, { posts }) =>
    PostAdapter.setAll(posts, { ...state, loading: false, error: null })
  ),
  on(loadPostsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //   CREATE
  on(createPost, (state, { postData }) =>
    PostAdapter.addOne({ ...postData, comments: [] } as PostWithComments, {
      ...state,
      loading: true,
    })
  ),
  on(createPostSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(createPostError, (state, { error }) => ({ ...state, error })),

  //   UPDATE
  on(updatePost, (state, { postData }) =>
    PostAdapter.updateOne({ id: postData.id, changes: postData }, state)
  ),
  on(updatePostSuccess, (state) => ({ ...state, error: null, loading: false })),
  on(updatePostError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //  DELETE
  on(deletePost, (state, { postId }) => PostAdapter.removeOne(postId, state)),
  on(deletePostSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(deletePostError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
