export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// create new post post data
export interface PostData {
  title: string;
  body: string;
  userId: number;
  id?: number;
}



export interface PostDataWithComments extends PostData { 
  comments: Comment[];
}