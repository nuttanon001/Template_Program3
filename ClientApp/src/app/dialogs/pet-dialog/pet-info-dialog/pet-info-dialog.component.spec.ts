import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInfoDialogComponent } from './pet-info-dialog.component';

describe('PetInfoDialogComponent', () => {
  let component: PetInfoDialogComponent;
  let fixture: ComponentFixture<PetInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
