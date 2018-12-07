import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseHistoryComponent } from './pet-have-diagnose-history.component';

describe('PetHaveDiagnoseHistoryComponent', () => {
  let component: PetHaveDiagnoseHistoryComponent;
  let fixture: ComponentFixture<PetHaveDiagnoseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHaveDiagnoseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHaveDiagnoseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
