import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loggingInterceptor } from './interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './store/post-effects/post.effects';
import { PostReducer } from './store/post-reducers/post.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideStore(),
    provideEffects(PostEffects),
    provideState({ name: 'posts', reducer: PostReducer }),
    BrowserModule,
    importProvidersFrom(BrowserAnimationsModule),
    provideEffects(),
  ],
};
