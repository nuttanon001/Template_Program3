import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInfoDialogComponent } from './medicine-info-dialog.component';

describe('MedicineInfoDialogComponent', () => {
  let component: MedicineInfoDialogComponent;
  let fixture: ComponentFixture<MedicineInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
