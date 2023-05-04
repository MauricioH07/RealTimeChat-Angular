import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLayoutComponent } from './single-layout.component';
import { environment } from "../../environments/environment";

describe('SingleLayoutComponent', () => {
  let component: SingleLayoutComponent;
  let fixture: ComponentFixture<SingleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
