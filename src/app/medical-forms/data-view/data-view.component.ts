import { Component, EventEmitter, Input, Output } from '@angular/core';
import { medicalShift } from '../../core/Models/medicalShift.model';
import { API_MEDICALSHIFTFORM } from '../../core/Utilities/Api';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { NgClass } from "../../../../node_modules/@angular/common/common_module.d-C8_X2MOZ";

@Component({
  selector: 'app-data-view',
  imports: [QRCodeComponent],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {


  @Output() onShowForms = new EventEmitter<string>();
  @Input() _data: medicalShift | undefined = undefined;
  qrUrl: string = API_MEDICALSHIFTFORM;
  qrDownload: SafeUrl = API_MEDICALSHIFTFORM;


  @Input()
  set data(data: medicalShift | undefined) {
    this._data = data;
    this.qrUrl = API_MEDICALSHIFTFORM + '?' + data?.accessCode;
  }
  constructor() { }
  onOpenForms() {
    console.log('onOpenForms');
    
    this.onShowForms.emit(this._data?.accessCode);
    if (this._data === undefined) {
      return;
    }
  }
  onChangeURL($event: SafeUrl) {
    this.qrDownload = $event;
  }

}
