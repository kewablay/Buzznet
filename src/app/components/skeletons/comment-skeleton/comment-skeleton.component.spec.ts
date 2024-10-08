import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSkeletonComponent } from './comment-skeleton.component';

describe('CommentSkeletonComponent', () => {
  let component: CommentSkeletonComponent;
  let fixture: ComponentFixture<CommentSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
