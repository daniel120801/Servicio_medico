import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateQRModalComponent } from './form-create-qrmodal.component';

describe('FormCreateQRModalComponent', () => {
  let component: FormCreateQRModalComponent;
  let fixture: ComponentFixture<FormCreateQRModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateQRModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateQRModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
