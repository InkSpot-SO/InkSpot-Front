import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePostComponent } from './favorite-post.component';

describe('FavoritePostComponent', () => {
  let component: FavoritePostComponent;
  let fixture: ComponentFixture<FavoritePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePostComponent]
    });
    fixture = TestBed.createComponent(FavoritePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
