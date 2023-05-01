import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterArtistselectorComponent } from './filter-artistselector.component';

describe('FilterArtistselectorComponent', () => {
  let component: FilterArtistselectorComponent;
  let fixture: ComponentFixture<FilterArtistselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterArtistselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterArtistselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
