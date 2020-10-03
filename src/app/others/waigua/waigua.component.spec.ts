import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiguaComponent } from './waigua.component';

describe('WaiguaComponent', () => {
  let component: WaiguaComponent;
  let fixture: ComponentFixture<WaiguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiguaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
