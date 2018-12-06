import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseMasterComponent } from './pet-have-diagnose-master.component';

describe('PetHaveDiagnoseMasterComponent', () => {
  let component: PetHaveDiagnoseMasterComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
