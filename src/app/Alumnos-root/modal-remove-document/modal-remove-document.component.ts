import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-remove-document',
  imports: [],
  templateUrl: './modal-remove-document.component.html',
  styleUrl: './modal-remove-document.component.css'
})
export class ModalRemoveDocumentComponent {
  @Output() onConfirmRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter<void>();
  fileName: string = '';
  id:number = -1;

  close() {
    this.onCloseModal.emit();
  }
  onshowModal(nameDocument: string,id:number) {
   
    this.fileName = nameDocument;
    this.id = id;
  }
  confirmRemove() {
    this.onConfirmRemove.emit(this.id);
  }

}
