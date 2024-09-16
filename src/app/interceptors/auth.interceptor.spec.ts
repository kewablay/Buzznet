import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { of } from 'rxjs';
import { loggingInterceptor } from './auth.interceptor';

describe('loggingInterceptor', () => {
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  it('should log response status for successful requests', (done) => {
    const req = new HttpRequest('GET', '/test-url');
    const next = jasmine
      .createSpy('next')
      .and.returnValue(
        of(new HttpResponse({ status: 200, body: 'test body' }))
      );

    loggingInterceptor(req, next).subscribe({
      complete: () => {
        expect(consoleSpy).toHaveBeenCalledWith(
          '/test-url',
          'returned a response with status',
          200
        );
        done();
      },
    });
  });

  it('should not log for non-response events', (done) => {
    const req = new HttpRequest('GET', '/test-url');
    const next = jasmine
      .createSpy('next')
      .and.returnValue(of({ type: HttpEventType.Sent } as HttpEvent<unknown>));

    loggingInterceptor(req, next).subscribe({
      complete: () => {
        expect(consoleSpy).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should pass through the request unmodified', (done) => {
    const req = new HttpRequest('GET', '/test-url');
    const response = new HttpResponse({ status: 200, body: 'test body' });
    const next = jasmine.createSpy('next').and.returnValue(of(response));

    loggingInterceptor(req, next).subscribe({
      next: (event) => {
        expect(event).toBe(response);
      },
      complete: () => {
        expect(next).toHaveBeenCalledWith(req);
        done();
      },
    });
  });

  it('should handle error responses', (done) => {
    const req = new HttpRequest('GET', '/test-url');
    const next = jasmine
      .createSpy('next')
      .and.returnValue(
        of(new HttpResponse({ status: 404, body: 'Not Found' }))
      );

    loggingInterceptor(req, next).subscribe({
      complete: () => {
        expect(consoleSpy).toHaveBeenCalledWith(
          '/test-url',
          'returned a response with status',
          404
        );
        done();
      },
    });
  });
});
