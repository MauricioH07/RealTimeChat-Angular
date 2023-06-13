import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardriveComponent } from './cardrive.component';

describe('CardriveComponent', () => {
  let component: CardriveComponent;
  let fixture: ComponentFixture<CardriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
