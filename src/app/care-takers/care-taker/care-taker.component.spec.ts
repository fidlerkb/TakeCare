import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTakerComponent } from './care-taker.component';

describe('CareTakerComponent', () => {
  let component: CareTakerComponent;
  let fixture: ComponentFixture<CareTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
