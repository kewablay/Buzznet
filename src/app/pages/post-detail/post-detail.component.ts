import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { CardComponent } from '../../components/card/card.component';
import { Post, PostData } from '../../models/app.model';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { SkeletonModule } from 'primeng/skeleton';
import { PostSkeletonComponent } from "../../components/skeletons/post-skeleton/post-skeleton.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    PostCardComponent,
    CommentListComponent,
    CardComponent,
    AsyncPipe,
    DialogModule,
    ButtonModule,
    PostFormComponent,
    SkeletonModule,
    PostSkeletonComponent
],

  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  post$!: Observable<Post>;
  visible: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const postId = params.get('id');
        return this.api.getSinglePost(Number(postId));
      })
    );
  }

  showDialog() {
    this.visible = true;
  }
  closeModal() {
    this.visible = false;
  }

  editPost(postData: PostData) {
    console.log('new post data: ', postData);
    this.api.udpatePost(postData).subscribe();
    this.closeModal();
  }
}
