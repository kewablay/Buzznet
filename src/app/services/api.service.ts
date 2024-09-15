import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Post,
  Comment,
  PostData,
} from '../models/app.model';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  BASE_URL = environment.apiUrl;

  // Get all post
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.BASE_URL}/posts`)
      .pipe(retry(3), catchError(this.handleError));
  }

  // Get a single post
  getSinglePost(id: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.BASE_URL}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get post comments
  getPostComments(id: number): Observable<Comment[]> {
    console.log('about to get post comments...', id);
    return this.http
      .get<Comment[]>(`${this.BASE_URL}/comments?postId=${id}`)
      .pipe(catchError(this.handleError));
  }

  // create a post
  createPost(postData: PostData): Observable<Post> {
    return this.http
      .post<Post>(`${this.BASE_URL}/posts`, postData)
      .pipe(catchError(this.handleError));
  }

  // updated a post
  udpatePost(postData: PostData): Observable<Post> {
    return this.http
      .put<Post>(`${this.BASE_URL}/posts/${postData.id}`, postData)
      .pipe(catchError(this.handleError));
  }

  // delete  a post
  deletePost(id: number): Observable<any> {
    console.log('About to delete post : ', id);
    return this.http.delete<any>(`${this.BASE_URL}/posts/${id}`).pipe(
      tap(() => console.log(`deleted post with id=${id}`)),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}
