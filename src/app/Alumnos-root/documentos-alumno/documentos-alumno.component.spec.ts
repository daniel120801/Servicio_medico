import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAlumnoComponent } from './documentos-alumno.component';

describe('DocumentosAlumnoComponent', () => {
  let component: DocumentosAlumnoComponent;
  let fixture: ComponentFixture<DocumentosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
