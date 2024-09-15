import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface CacheEntry {
  expiration: number;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [url: string]: CacheEntry } = {};
  private cacheDuration = 3000;

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    const currTime = new Date().getTime();

    if (this.cache[url] && this.cache[url].expiration > currTime) {
      return of(this.cache[url].data);
    }

    return this.http.get(url).pipe(
      tap((data) => {
        this.cache[url] = {
          expiration: currTime + this.cacheDuration,
          data,
        };
      })
    );
  }

  clearCache(url?: string): void {
    if (url) {
      delete this.cache[url];
    } else {
      this.cache = {};
    }
  }
}