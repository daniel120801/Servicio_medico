import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataViewComponent } from '../data-view/data-view.component';
import { provideSharedFeature } from '../../core/providers/medical.providers';
import { MedicalShiftService } from '../../core/services/medical-shift.service';
import { medicalShift } from '../../core/Models/medicalShift.model';
import { FormCreateQrComponent } from '../../form-create-qrmodal/form-create-qrmodal.component';

@Component({
  selector: 'app-list-view',
  imports: [DatePipe, FormCreateQrComponent, DataViewComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
  providers: [provideSharedFeature]
})
export class ListViewComponent implements OnInit {

  listMedicalShifts: medicalShift[] = [];

  @Output() onShowForms = new EventEmitter<string>();
  constructor(private medicalService: MedicalShiftService) { }
  MedicalShiftSelected: medicalShift | undefined = undefined;


  ngOnInit(): void {
    this.medicalService.getAllHeaders().subscribe({
      next: (qrCodes: medicalShift[]) => {
        console.log(qrCodes);

        this.listMedicalShifts = qrCodes;
        console.log(this.listMedicalShifts);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  showModalNewQR: boolean = false;

  onOpenForms($value:string){
    console.log( 'try open ', $value);
    this.onShowForms.emit($value);
  
    
  }
  generarNuevoQR($value: string) {

    this.medicalService.createNewMedicalShift($value).subscribe({
      next: (qrCode: medicalShift) => {
        console.log(qrCode);
        this.listMedicalShifts.push(qrCode);
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }
  
  showDetails(arg: medicalShift) {

    this.MedicalShiftSelected = arg;
  }
  changeModalVisibility(arg: boolean) {
    this.showModalNewQR = arg;
  }
  openModal() {
    this.showModalNewQR = true;
  }

  closeModal() {
    this.showModalNewQR = false;
  }

}