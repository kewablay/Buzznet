import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { CardComponent } from '../card/card.component';
import { Post } from '../../models/app.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { PostSkeletonComponent } from "../skeletons/post-skeleton/post-skeleton.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, CardComponent, AsyncPipe, RouterLink, SkeletonModule, PostSkeletonComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  posts$: Observable<Post[]>;
  mockPostForLoading = [...Array(3)]
  constructor(private api: ApiService) {
    this.posts$ = this.api.getPosts();
  }

  ngOnInit() {
    this.posts$.subscribe((data) => console.log(data));
  }
}
