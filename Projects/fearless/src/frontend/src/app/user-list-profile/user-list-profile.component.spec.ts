import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListProfileComponent } from './user-list-profile.component';

describe('UserListProfileComponent', () => {
  let component: UserListProfileComponent;
  let fixture: ComponentFixture<UserListProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
