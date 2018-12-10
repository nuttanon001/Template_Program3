import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTableExtendComponent } from './treatment-table-extend.component';

describe('TreatmentTableExtendComponent', () => {
  let component: TreatmentTableExtendComponent;
  let fixture: ComponentFixture<TreatmentTableExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentTableExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentTableExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
