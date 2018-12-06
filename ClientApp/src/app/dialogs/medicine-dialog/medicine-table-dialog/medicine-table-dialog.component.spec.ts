import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTableDialogComponent } from './medicine-table-dialog.component';

describe('MedicineTableDialogComponent', () => {
  let component: MedicineTableDialogComponent;
  let fixture: ComponentFixture<MedicineTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
