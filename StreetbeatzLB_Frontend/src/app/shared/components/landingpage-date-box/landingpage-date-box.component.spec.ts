import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageDateBoxComponent } from './landingpage-date-box.component';

describe('LandingpageDateBoxComponent', () => {
  let component: LandingpageDateBoxComponent;
  let fixture: ComponentFixture<LandingpageDateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageDateBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageDateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
