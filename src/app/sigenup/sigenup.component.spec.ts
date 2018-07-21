import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigenupComponent } from './sigenup.component';

describe('SigenupComponent', () => {
  let component: SigenupComponent;
  let fixture: ComponentFixture<SigenupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigenupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigenupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
