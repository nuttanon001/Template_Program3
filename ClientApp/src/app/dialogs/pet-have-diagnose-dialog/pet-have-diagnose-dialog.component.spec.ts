import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseDialogComponent } from './pet-have-diagnose-dialog.component';

describe('PetHaveDiagnoseDialogComponent', () => {
  let component: PetHaveDiagnoseDialogComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
