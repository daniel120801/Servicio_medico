import { Component, Input, OnInit } from '@angular/core';
import { provideSharedFeature } from '../../core/providers/medical.providers';
import { MedicalShiftService } from '../../core/services/medical-shift.service';
import { IFormMedicalShift } from '../../core/Models/response_medical_shift.model';

@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
  providers: [provideSharedFeature]
})
export class FormsComponent implements OnInit {

  @Input() accessCode: string = '';
  names: string[] = [];
  data: IFormMedicalShift|null = null;
  searchingData:boolean = false;
  constructor(private medicalService: MedicalShiftService) {
  }
  ngOnInit(): void {
    console.log('opening forms');

    this.medicalService.getFormsHeader(this.accessCode).subscribe((forms) => {
      this.names = forms;
    });

  }
  onLoadFormData(name: string) {
    this.searchingData = true;
    this.medicalService.getFormData(this.accessCode, name).subscribe({
      next: (data) => {
        this.searchingData = false;
        console.log('data recibida, ', data);
        
        this.data = data;
      },
    })
  }
}