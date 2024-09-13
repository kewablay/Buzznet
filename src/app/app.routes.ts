import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post-detail/:id',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
  },
];
