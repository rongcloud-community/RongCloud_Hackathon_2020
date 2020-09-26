import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherInfoComponent } from './edit-other-info.component';

describe('EditOtherInfoComponent', () => {
  let component: EditOtherInfoComponent;
  let fixture: ComponentFixture<EditOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
