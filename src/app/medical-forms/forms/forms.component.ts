import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataViewComponent } from '../data-view/data-view.component';
import { provideSharedFeature } from '../../core/providers/medical.providers';
import { MedicalShiftService } from '../../core/services/medical-shift.service';
import { medicalShift } from '../../core/Models/medicalShift.model';
import { FormCreateQrComponent } from '../../form-create-qrmodal/form-create-qrmodal.component';

@Component({
  selector: 'app-forms',
  imports: [DatePipe, FormCreateQrComponent, DataViewComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
  providers: [provideSharedFeature]
})
export class FormsComponent implements OnInit {

  listMedicalShifts: medicalShift[] = [];
  constructor(private medicalService: MedicalShiftService) { }


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

  generarNuevoQR($value: string) {
    const newId = (this.listMedicalShifts.length + 1).toString();
    this.closeModal()
    this.listMedicalShifts.push();
  }

  openQR(arg0: number) {

  }

  openModal() {
    this.showModalNewQR = true;
  }

  closeModal() {
    this.showModalNewQR = false;
  }

}