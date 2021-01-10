import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltiesListComponent } from './novelties-list.component';

describe('NoveltiesListComponent', () => {
  let component: NoveltiesListComponent;
  let fixture: ComponentFixture<NoveltiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
