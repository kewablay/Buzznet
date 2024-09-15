export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// create new post post data
export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostData extends CreatePostData {
  id: number;
}
