import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseTableComponent } from './pet-have-diagnose-table.component';

describe('PetHaveDiagnoseTableComponent', () => {
  let component: PetHaveDiagnoseTableComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
