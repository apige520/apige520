import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { homeDetailComponent } from './homeDetail.component';

describe('homeDetailComponent', () => {
  let component: homeDetailComponent;
  let fixture: ComponentFixture<homeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ homeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(homeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
