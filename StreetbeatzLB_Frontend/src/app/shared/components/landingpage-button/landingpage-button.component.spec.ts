import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageButtonComponent } from './landingpage-button.component';

describe('LandingpageButtonComponent', () => {
  let component: LandingpageButtonComponent;
  let fixture: ComponentFixture<LandingpageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
