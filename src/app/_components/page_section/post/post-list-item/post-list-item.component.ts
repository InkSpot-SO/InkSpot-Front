import { Component, Input } from '@angular/core';
import { IK_Post } from 'src/_ngrx/models/post/post.model';

@Component({
  selector: 'ik-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {
  @Input({required:true}) post! : IK_Post;

}
