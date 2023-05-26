import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHomeComponent } from './table-home.component';

describe('TableHomeComponent', () => {
  let component: TableHomeComponent;
  let fixture: ComponentFixture<TableHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
