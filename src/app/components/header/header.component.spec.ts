import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header element', () => {
    const headerElement = fixture.nativeElement.querySelector('header');
    expect(headerElement).toBeTruthy();
  });

  it('should have an h1 element with correct text', () => {
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toContain('BuzzNet');
  });

  it('should have "Buzz" with text-primary class', () => {
    const spanElement = fixture.nativeElement.querySelector('h1 span.text-primary');
    expect(spanElement).toBeTruthy();
    expect(spanElement.textContent).toBe('Buzz');
  });

  it('should have RouterLink directive on h1', () => {
    const h1Element = fixture.debugElement.query(By.css('h1'));
    const routerLink = h1Element.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/');
  });

  it('should project content into ng-content', () => {
    const hostElement = document.createElement('div');
    hostElement.innerHTML = '<app-header><button button>Test Button</button></app-header>';
    document.body.appendChild(hostElement);

    const headerFixture = TestBed.createComponent(HeaderComponent);
    headerFixture.detectChanges();

    const projectedContent = headerFixture.nativeElement.querySelector('[button]');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toBe('Test Button');

    document.body.removeChild(hostElement);
  });
});