import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDesktopComponent } from './navbar-desktop.component';

describe('DesktopComponent', () => {
  let component: NavbarDesktopComponent;
  let fixture: ComponentFixture<NavbarDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
