import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry

import { NgModule } from '@angular/core';
import { PostDataService } from '../services/post.service';


@NgModule({
  imports: [],
  providers: [ PostDataService ] // <-- provide the data service
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    postService: PostDataService,
    pagintedPostService: PostDataService
  ) {
    entityDataService.registerService('Post', postService); // <-- register it
    entityDataService.registerService('PaginatedPost', pagintedPostService); // <-- register it
  }
}
