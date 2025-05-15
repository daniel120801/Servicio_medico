import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroModalComponent } from './form-registro-modal.component';

describe('FormRegistroModalComponent', () => {
  let component: FormRegistroModalComponent;
  let fixture: ComponentFixture<FormRegistroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
