import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { medicalShift } from '../../core/Models/medicalShift.model';

import { API_MEDICALSHIFTFORM } from '../../core/Utilities/Api';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-data-view',
  imports: [QRCodeComponent, NgClass],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {


  @Output() onShowForms = new EventEmitter<string>();
  @Output() onChangeState = new EventEmitter<number>();
  @Input() _data: medicalShift | undefined = undefined;
  qrUrl: string = API_MEDICALSHIFTFORM;
  qrDownload: SafeUrl = API_MEDICALSHIFTFORM;


  @Input()
  set data(data: medicalShift | undefined) {
    this._data = data;
    this.qrUrl = API_MEDICALSHIFTFORM + '?' + data?.accessCode;
  }
  constructor() { }
  changeState() {
    this.onChangeState.emit(this._data?.id);
  }
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
