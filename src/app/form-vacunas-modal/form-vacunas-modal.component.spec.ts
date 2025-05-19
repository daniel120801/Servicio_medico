import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVacunasModalComponent } from './form-vacunas-modal.component';

describe('FormVacunasModalComponent', () => {
  let component: FormVacunasModalComponent;
  let fixture: ComponentFixture<FormVacunasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVacunasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVacunasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
