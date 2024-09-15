import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post, PostData } from '../../models/app.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.sass',
})
export class PostFormComponent {
  @Output() closeModal = new EventEmitter();
  @Output() submitPost = new EventEmitter<PostData>();
  @Input() post: Post | null = null;

  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({});
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: new FormControl(this.post?.title || '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      body: new FormControl(this.post?.body || '', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }


  closePostModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.postForm.valid) {
      // if there is a post Update post
      if (this.post) {
        const postData: PostData = {
          ...this.postForm.value,
          id: this.post.id,
          userId: this.post.userId,
        };
        this.submitPost.emit(postData);
      } // create a new post
      else {
        const postData: PostData = {
          ...this.postForm.value,
          id: Math.floor(Math.random() * 100000) + 100,
        };
        this.submitPost.emit(postData);
        this.postForm.reset();
      }
    }
  }
}
