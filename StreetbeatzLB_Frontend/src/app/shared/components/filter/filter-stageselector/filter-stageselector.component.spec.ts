import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStageselectorComponent } from './filter-stageselector.component';

describe('FilterStageselectorComponent', () => {
  let component: FilterStageselectorComponent;
  let fixture: ComponentFixture<FilterStageselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStageselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStageselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
