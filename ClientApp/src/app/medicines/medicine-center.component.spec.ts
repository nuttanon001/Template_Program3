import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCenterComponent } from './medicine-center.component';

describe('MedicineCenterComponent', () => {
  let component: MedicineCenterComponent;
  let fixture: ComponentFixture<MedicineCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
