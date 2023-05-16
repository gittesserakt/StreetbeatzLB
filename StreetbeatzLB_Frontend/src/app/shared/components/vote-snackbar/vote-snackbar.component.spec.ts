import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSnackbarComponent } from './vote-snackbar.component';

describe('VoteSnackbarComponent', () => {
  let component: VoteSnackbarComponent;
  let fixture: ComponentFixture<VoteSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
