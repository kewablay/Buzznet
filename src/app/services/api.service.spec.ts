import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { environment } from '../../environments/environment.development';
import { Post, Comment, PostData } from '../models/app.model';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let cacheServiceSpy: jasmine.SpyObj<CacheService>;

  beforeEach(() => {
    const cacheSpy = jasmine.createSpyObj('CacheService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: CacheService, useValue: cacheSpy }
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheServiceSpy = TestBed.inject(CacheService) as jasmine.SpyObj<CacheService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should return posts from cache service', (done) => {
      const mockPosts: Post[] = [{ id: 1, title: 'Post 1', body: 'Body 1', userId: 1 }];
      cacheServiceSpy.get.and.returnValue(of(mockPosts));

      service.getPosts().subscribe(posts => {
        expect(posts).toEqual(mockPosts);
        expect(cacheServiceSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/posts`);
        done();
      });
    });

    it('should retry 3 times before failing', (done) => {
      cacheServiceSpy.get.and.returnValue(throwError(() => new Error('Test error')));

      service.getPosts().subscribe({
        error: (error) => {
          expect(cacheServiceSpy.get).toHaveBeenCalledTimes(4); // 1 original + 3 retries
          expect(error).toBeTruthy();
          done();
        }
      });
    });
  });

  describe('getSinglePost', () => {
    it('should return a single post from cache service', (done) => {
      const mockPost: Post = { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 };
      cacheServiceSpy.get.and.returnValue(of(mockPost));

      service.getSinglePost(1).subscribe(post => {
        expect(post).toEqual(mockPost);
        expect(cacheServiceSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/posts/1`);
        done();
      });
    });
  });

  describe('getPostComments', () => {
    it('should return comments for a post from cache service', (done) => {
      const mockComments: Comment[] = [{ id: 1, postId: 1, name: 'Comment 1', email: 'test@test.com', body: 'Comment body' }];
      cacheServiceSpy.get.and.returnValue(of(mockComments));

      service.getPostComments(1).subscribe(comments => {
        expect(comments).toEqual(mockComments);
        expect(cacheServiceSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/comments?postId=1`);
        done();
      });
    });
  });

  describe('createPost', () => {
    it('should create a new post', (done) => {
      const newPost: PostData = { title: 'New Post', body: 'New Body', userId: 1 };
      const mockResponse: Post = { id: 1, ...newPost };

      service.createPost(newPost).subscribe(post => {
        expect(post).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', (done) => {
     const updatedPost: Post = { id: 1, title: 'Updated Post', body: 'Updated Body', userId: 1 };

      service.udpatePost(updatedPost).subscribe(post => {
        expect(post).toEqual(updatedPost);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', (done) => {
      service.deletePost(1).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should log deletion', (done) => {
      spyOn(console, 'log');

      service.deletePost(1).subscribe(() => {
        expect(console.log).toHaveBeenCalledWith('deleted post with id=1');
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
      req.flush({});
    });
  });

  describe('error handling', () => {
    it('should handle http errors', (done) => {
      service.getSinglePost(1).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle client-side errors', (done) => {
      const errorEvent = new ErrorEvent('Network error', { message: 'Connection lost' });
      spyOn(console, 'error');

      service.getSinglePost(1).subscribe({
        error: (error) => {
          expect(console.error).toHaveBeenCalledWith('An error occurred:', 'Connection lost');
          done();
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
      req.error(errorEvent);
    });
  });
});