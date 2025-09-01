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

  constructor(private medicalService: MedicalShiftService) {

  }
  ngOnInit(): void {
    console.log('opening forms');

    this.medicalService.getForms(this.accessCode).subscribe((forms) => {
      console.log('forms', forms);
    });
  }

}