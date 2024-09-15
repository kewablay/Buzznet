import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { DialogModule } from 'primeng/dialog';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostData } from '../../models/app.model';
import { ApiService } from '../../services/api.service';

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

  constructor(private api: ApiService) {}
  showDialog() {
    this.visible = true;
  }
  closeModal() {
    this.visible = false;
  }

  createPost(postData: PostData) {
    console.log('new post data: ', postData);
    this.api.createPost(postData).subscribe();

    this.closeModal();
  }
}
