import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authReq = req.clone({
//     headers: req.headers.set('Authorization', 'Bearer mock-token'),
//   });
//   return next.handle(authReq).pipe(
//     tap((event) => {
//       if (event instanceof HttpResponse) {
//         console.log('API call successful: ', event);
//       }
//     })
//   );
// };

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    })
  );
}
