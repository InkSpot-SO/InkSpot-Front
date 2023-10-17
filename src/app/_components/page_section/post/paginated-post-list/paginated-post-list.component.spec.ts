import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedPostListComponent } from './paginated-post-list.component';

describe('PaginatedPostListComponent', () => {
  let component: PaginatedPostListComponent;
  let fixture: ComponentFixture<PaginatedPostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatedPostListComponent]
    });
    fixture = TestBed.createComponent(PaginatedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
