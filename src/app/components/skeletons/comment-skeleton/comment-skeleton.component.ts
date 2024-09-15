import { Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-comment-skeleton',
  standalone: true,
  imports: [CardComponent, SkeletonModule],
  templateUrl: './comment-skeleton.component.html',
  styleUrl: './comment-skeleton.component.sass',
})
export class CommentSkeletonComponent {}
