import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { PostListComponent } from "../../components/post-list/post-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
