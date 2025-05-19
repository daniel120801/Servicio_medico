import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultaModalComponent } from './form-consulta-modal.component';

describe('FormConsultaModalComponent', () => {
  let component: FormConsultaModalComponent;
  let fixture: ComponentFixture<FormConsultaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConsultaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsultaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
