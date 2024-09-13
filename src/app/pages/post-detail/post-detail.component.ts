import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { CommentListComponent } from "../../components/comment-list/comment-list.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [HeaderComponent, PostCardComponent, CommentListComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass'
})
export class PostDetailComponent {

}
