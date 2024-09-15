import { Component, Input, SimpleChange } from '@angular/core';
import { CardComponent } from '../card/card.component';
import {  PostWithComments } from '../../models/app.model';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { deletePost } from '../../store/post-actions/post.actions';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() post!: PostWithComments;

  constructor(private store: Store) {}

  deletePost(id: number, event: Event) {
    event.stopPropagation();
    this.store.dispatch(deletePost({ postId: id }));
  }
}
