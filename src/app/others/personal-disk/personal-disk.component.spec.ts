import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDiskComponent } from './personal-disk.component';

describe('PersonalDiskComponent', () => {
  let component: PersonalDiskComponent;
  let fixture: ComponentFixture<PersonalDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
