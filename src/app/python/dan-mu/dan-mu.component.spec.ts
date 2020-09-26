import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanMuComponent } from './dan-mu.component';

describe('DanMuComponent', () => {
  let component: DanMuComponent;
  let fixture: ComponentFixture<DanMuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanMuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanMuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
