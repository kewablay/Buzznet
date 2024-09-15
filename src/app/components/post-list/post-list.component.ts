import { Component } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, CardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass'
})
export class PostListComponent {

}
