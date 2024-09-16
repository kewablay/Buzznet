import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { deletePost } from '../../store/post-actions/post.actions';
import { PostWithComments } from '../../models/app.model';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PostCardComponent, CardComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input post correctly', () => {
    const testPost: PostWithComments = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1,
      comments: []
    };
    component.post = testPost;
    expect(component.post).toEqual(testPost);
  });

  describe('deletePost', () => {
    let mockEvent: jasmine.SpyObj<Event>;

    beforeEach(() => {
      mockEvent = jasmine.createSpyObj('Event', ['stopPropagation']);
    });

    it('should dispatch deletePost action', () => {
      component.deletePost(1, mockEvent);
      expect(storeMock.dispatch).toHaveBeenCalledWith(deletePost({ postId: 1 }));
    });

    it('should stop event propagation', () => {
      component.deletePost(1, mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should navigate to home if on detail page', () => {
      spyOnProperty(window, 'location', 'get').and.returnValue({ href: 'http://localhost:4200/post-detail/1' } as Location);
      component.deletePost(1, mockEvent);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not navigate if not on detail page', () => {
      spyOnProperty(window, 'location', 'get').and.returnValue({ href: 'http://localhost:4200/' } as Location);
      component.deletePost(1, mockEvent);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });
});