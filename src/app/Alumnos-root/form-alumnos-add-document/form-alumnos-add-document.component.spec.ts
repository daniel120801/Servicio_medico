import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlumnosAddDocumentComponent } from './form-alumnos-add-document.component';

describe('FormAlumnosAddDocumentComponent', () => {
  let component: FormAlumnosAddDocumentComponent;
  let fixture: ComponentFixture<FormAlumnosAddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAlumnosAddDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAlumnosAddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
