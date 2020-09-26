import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DNFcustomerComponent } from './dnfcustomer.component';

describe('DNFcustomerComponent', () => {
  let component: DNFcustomerComponent;
  let fixture: ComponentFixture<DNFcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DNFcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DNFcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
