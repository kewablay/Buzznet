import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { Store } from '@ngrx/store';
import { loadPosts } from './store/post-actions/post.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }
}
