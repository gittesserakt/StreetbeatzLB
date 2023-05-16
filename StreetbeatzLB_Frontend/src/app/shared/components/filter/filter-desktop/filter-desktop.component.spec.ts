import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDesktopComponent } from './filter-desktop.component';

describe('FilterDesktopComponent', () => {
  let component: FilterDesktopComponent;
  let fixture: ComponentFixture<FilterDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
