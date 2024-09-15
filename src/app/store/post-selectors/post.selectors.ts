import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostAdapter, PostsState } from '../post-state/post.state';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const {
  selectAll: selectAllPosts,
  selectEntities: selectPostsEntities,
  selectIds: selectPostsIds,
  selectTotal: selectPostsTotal,
} = PostAdapter.getSelectors(selectPostsState);

export const selectPostById = (id: number) =>
  createSelector(selectPostsEntities, (entities) => entities[id]);

export const selectPostLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectPostError = createSelector(
  selectPostsState,
  (state) => state.error
);
