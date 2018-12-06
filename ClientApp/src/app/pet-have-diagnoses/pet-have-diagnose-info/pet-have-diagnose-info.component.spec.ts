import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseInfoComponent } from './pet-have-diagnose-info.component';

describe('PetHaveDiagnoseInfoComponent', () => {
  let component: PetHaveDiagnoseInfoComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
