import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTimepickerComponent } from './filter-timepicker.component';

describe('FilterTimepickerComponent', () => {
  let component: FilterTimepickerComponent;
  let fixture: ComponentFixture<FilterTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTimepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
