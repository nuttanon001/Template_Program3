import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentInfoDialogComponent } from './treatment-info-dialog.component';

describe('TreatmentInfoDialogComponent', () => {
  let component: TreatmentInfoDialogComponent;
  let fixture: ComponentFixture<TreatmentInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
