import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateQrComponent } from './form-create-qr.component';

describe('FormCreateQrComponent', () => {
  let component: FormCreateQrComponent;
  let fixture: ComponentFixture<FormCreateQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
