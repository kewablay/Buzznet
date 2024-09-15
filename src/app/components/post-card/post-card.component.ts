import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass'
})
export class PostCardComponent {
  @Input() post!: Post;
}
