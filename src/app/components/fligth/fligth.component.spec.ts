import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FligthComponent } from './fligth.component';

describe('FligthComponent', () => {
  let component: FligthComponent;
  let fixture: ComponentFixture<FligthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FligthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FligthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
