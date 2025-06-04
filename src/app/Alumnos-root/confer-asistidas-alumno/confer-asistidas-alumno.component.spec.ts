import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferAsistidasAlumnoComponent } from './confer-asistidas-alumno.component';

describe('ConferAsistidasAlumnoComponent', () => {
  let component: ConferAsistidasAlumnoComponent;
  let fixture: ComponentFixture<ConferAsistidasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferAsistidasAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferAsistidasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
