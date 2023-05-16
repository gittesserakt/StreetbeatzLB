import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMobileComponent } from './filter-mobile.component';

describe('FilterMobileComponent', () => {
  let component: FilterMobileComponent;
  let fixture: ComponentFixture<FilterMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
