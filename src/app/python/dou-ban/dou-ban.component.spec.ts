import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DouBanComponent } from './dou-ban.component';

describe('DouBanComponent', () => {
  let component: DouBanComponent;
  let fixture: ComponentFixture<DouBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DouBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DouBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
