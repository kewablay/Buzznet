import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PostCardComponent } from '../post-card/post-card.component';
import { CardComponent } from '../card/card.component';
import { PostSkeletonComponent } from '../skeletons/post-skeleton/post-skeleton.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      imports: [
        PostListComponent,
        PostCardComponent,
        CardComponent,
        PostSkeletonComponent,
        NgxPaginationModule,
      ],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables from store', () => {
    storeMock.select.and.returnValue(of([]));
    fixture.detectChanges();

    expect(storeMock.select).toHaveBeenCalledTimes(3);
    expect(component.allPosts$).toBeDefined();
    expect(component.postLoading$).toBeDefined();
    expect(component.postError$).toBeDefined();
  });

  it('should set initial page number to 1', () => {
    expect(component.p).toBe(1);
  });

  it('should have mockPostForLoading with 3 items', () => {
    expect(component.mockPostForLoading.length).toBe(3);
  });

  // Add more tests here as needed
});