import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseCenterComponent } from './pet-have-diagnose-center.component';

describe('PetHaveDiagnoseCenterComponent', () => {
  let component: PetHaveDiagnoseCenterComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
