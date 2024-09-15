import { Component, Input, SimpleChange } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Post, Comment } from '../../models/app.model';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() post!: Post;
  comments$!: Observable<Comment[]>;

  constructor(private api: ApiService) {
    if (this.post) {
      this.comments$ = this.api.getPostComments(this.post.id);
    }
  }

  ngOnChanges() {
    if (this.post) {
      this.comments$ = this.api.getPostComments(this.post.id);
    }
  }

  deletePost(id: number, event: Event) {
    event.stopPropagation();
    this.api.deletePost(id).subscribe({
      next: (data) => {
        console.log('Post deleted successfully', data);
        this.api
          .getPosts()
          .subscribe((data) => console.log('data after delete: ', data));
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      },
    });
  }
}
