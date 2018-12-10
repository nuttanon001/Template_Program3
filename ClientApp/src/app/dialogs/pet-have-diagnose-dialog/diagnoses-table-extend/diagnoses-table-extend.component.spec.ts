import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosesTableExtendComponent } from './diagnoses-table-extend.component';

describe('DiagnosesTableExtendComponent', () => {
  let component: DiagnosesTableExtendComponent;
  let fixture: ComponentFixture<DiagnosesTableExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosesTableExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosesTableExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
