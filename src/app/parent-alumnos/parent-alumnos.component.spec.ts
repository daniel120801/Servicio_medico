import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAlumnosComponent } from './parent-alumnos.component';

describe('ParentAlumnosComponent', () => {
  let component: ParentAlumnosComponent;
  let fixture: ComponentFixture<ParentAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAlumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
