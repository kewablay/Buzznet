import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.sass'
})
export class CommentListComponent {

}
