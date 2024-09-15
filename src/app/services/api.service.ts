import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePostData, Post, UpdatePostData } from '../models/app.model';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, retry, throwError } from 'rxjs';

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
    return this.http
      .get<Comment[]>(`${this.BASE_URL}/posts/${id}/comments`)
      .pipe(catchError(this.handleError));
  }

  // create a post
  createPost(postData: CreatePostData): Observable<Post> {
    return this.http
      .post<Post>(`${this.BASE_URL}/posts`, postData)
      .pipe(catchError(this.handleError));
  }

  // updated a post
  udpatePost(postData: UpdatePostData): Observable<Post> {
    return this.http
      .put<Post>(`${this.BASE_URL}/posts/${postData.id}`, postData)
      .pipe(catchError(this.handleError));
  }

  // delete  a post
  deletePost(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.BASE_URL}/posts/${id}`)
      .pipe(catchError(this.handleError));
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
