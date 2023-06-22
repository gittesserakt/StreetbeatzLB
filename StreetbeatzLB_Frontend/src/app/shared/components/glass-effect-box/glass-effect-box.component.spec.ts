import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassEffectBoxComponent } from './glass-effect-box.component';

describe('GlassEffectBoxComponent', () => {
  let component: GlassEffectBoxComponent;
  let fixture: ComponentFixture<GlassEffectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassEffectBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassEffectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
