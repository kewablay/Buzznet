import { Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-post-skeleton',
  standalone: true,
  imports: [CardComponent, SkeletonModule],
  templateUrl: './post-skeleton.component.html',
  styleUrl: './post-skeleton.component.sass',
})
export class PostSkeletonComponent {}
