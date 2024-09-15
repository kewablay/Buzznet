import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { DialogModule } from 'primeng/dialog';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostData } from '../../models/app.model';
import { Store } from '@ngrx/store';
import { createPost } from '../../store/post-actions/post.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    PostListComponent,
    DialogModule,
    PostFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  visible: boolean = false;

  constructor(private store: Store) {}
  showDialog() {
    this.visible = true;
  }
  closeModal() {
    this.visible = false;
  }

  createPost(postData: PostData) {
    this.store.dispatch(createPost({ postData }));
    this.closeModal();
  }
}
