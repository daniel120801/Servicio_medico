import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegMedicoAlumnoComponent } from './seg-medico-alumno.component';

describe('SegMedicoAlumnoComponent', () => {
  let component: SegMedicoAlumnoComponent;
  let fixture: ComponentFixture<SegMedicoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegMedicoAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegMedicoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
