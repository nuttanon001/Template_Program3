import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseInfoDialogComponent } from './pet-have-diagnose-info-dialog.component';

describe('PetHaveDiagnoseInfoDialogComponent', () => {
  let component: PetHaveDiagnoseInfoDialogComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
