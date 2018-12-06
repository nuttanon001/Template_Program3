import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineMasterComponent } from './medicine-master.component';

describe('MedicineMasterComponent', () => {
  let component: MedicineMasterComponent;
  let fixture: ComponentFixture<MedicineMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
