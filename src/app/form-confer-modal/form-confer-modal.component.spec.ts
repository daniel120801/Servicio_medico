import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConferModalComponent } from './form-confer-modal.component';

describe('FormConferModalComponent', () => {
  let component: FormConferModalComponent;
  let fixture: ComponentFixture<FormConferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConferModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
