import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTableDialogComponent } from './pet-table-dialog.component';

describe('PetTableDialogComponent', () => {
  let component: PetTableDialogComponent;
  let fixture: ComponentFixture<PetTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
