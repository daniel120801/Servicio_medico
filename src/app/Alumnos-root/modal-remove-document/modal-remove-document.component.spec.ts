import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveDocumentComponent } from './modal-remove-document.component';

describe('ModalRemoveDocumentComponent', () => {
  let component: ModalRemoveDocumentComponent;
  let fixture: ComponentFixture<ModalRemoveDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRemoveDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRemoveDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
