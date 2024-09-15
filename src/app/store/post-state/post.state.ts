import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PostWithComments } from '../../models/app.model';

export interface PostsState extends EntityState<PostWithComments> {
  posts: PostWithComments[];
  loading: boolean;
  error: any;
}

export const PostAdapter: EntityAdapter<PostWithComments> =
  createEntityAdapter<PostWithComments>({
    selectId: (post: PostWithComments) => post.id,
    sortComparer: (a: PostWithComments, b: PostWithComments) => {
      return b.id - a.id;
    },
  });

export const InitialPostState: PostsState = PostAdapter.getInitialState({
  posts: [],
  loading: false,
  error: null,
});
