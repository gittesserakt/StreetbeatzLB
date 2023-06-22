import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageSponsorComponent } from './landingpage-sponsor.component';

describe('LandingpageSponsorComponent', () => {
  let component: LandingpageSponsorComponent;
  let fixture: ComponentFixture<LandingpageSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageSponsorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
