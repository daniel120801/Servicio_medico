import { Component, Input, OnInit } from '@angular/core';
import { provideSharedFeature } from '../../core/providers/medical.providers';
import { MedicalShiftService } from '../../core/services/medical-shift.service';

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
  data: any = '';
  searchingData:boolean = false;
  constructor(private medicalService: MedicalShiftService) {
  }
  ngOnInit(): void {
    console.log('opening forms');

    this.medicalService.getFormsName(this.accessCode).subscribe((forms) => {
      this.names = forms;
    });


  }
  onLoadFormData(name: string) {
    this.searchingData = true;
    this.medicalService.getFormData(this.accessCode, name).subscribe({
      next: (data) => {
        this.searchingData = false;
        this.data = data;
      },
    })
  }
}