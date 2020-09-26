import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DNFAdminComponent } from './dnfadmin.component';

describe('DNFAdminComponent', () => {
  let component: DNFAdminComponent;
  let fixture: ComponentFixture<DNFAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DNFAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DNFAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
