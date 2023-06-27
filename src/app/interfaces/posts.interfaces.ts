export interface PostsResponse {
  ok: boolean;
  page: number;
  posts: Post[];
}

export interface PostResponse {
  ok: boolean;
  post: Post;
}

export interface Post {
  _id?: string;
  message?: string;
  img?: string[];
  coords?: string | null;
  user?: User;
  created?: Date;
  position?: boolean;
}

export interface User {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
}

export interface CreatePost {
  message?: string;
  coords?: string | null;
}
