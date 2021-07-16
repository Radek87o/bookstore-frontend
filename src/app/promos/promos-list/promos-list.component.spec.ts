import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromosListComponent } from './promos-list.component';

describe('PromosListComponent', () => {
  let component: PromosListComponent;
  let fixture: ComponentFixture<PromosListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PromosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
