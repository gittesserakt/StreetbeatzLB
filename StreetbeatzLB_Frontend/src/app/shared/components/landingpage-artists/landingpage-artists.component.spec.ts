import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageArtistsComponent } from './landingpage-artists.component';

describe('LandingpageArtistsComponent', () => {
  let component: LandingpageArtistsComponent;
  let fixture: ComponentFixture<LandingpageArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageArtistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
