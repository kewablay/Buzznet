import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { CardComponent } from '../card/card.component';
import { Post } from '../../models/app.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, CardComponent, AsyncPipe, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  posts$: Observable<Post[]>;

  constructor(private api: ApiService) {
    this.posts$ = this.api.getPosts();
  }

  ngOnInit() {
    this.posts$.subscribe((data) => console.log(data));
  }
}
