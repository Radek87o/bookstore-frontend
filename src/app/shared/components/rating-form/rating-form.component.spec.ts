import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingFormComponent } from './rating-form.component';

describe('RatingFormComponent', () => {
  let component: RatingFormComponent;
  let fixture: ComponentFixture<RatingFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
