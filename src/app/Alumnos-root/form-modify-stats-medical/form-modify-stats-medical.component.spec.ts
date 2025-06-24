import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifyStatsMedicalComponent } from './form-modify-stats-medical.component';

describe('FormModifyStatsMedicalComponent', () => {
  let component: FormModifyStatsMedicalComponent;
  let fixture: ComponentFixture<FormModifyStatsMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModifyStatsMedicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModifyStatsMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
