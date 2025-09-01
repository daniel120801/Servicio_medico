import { Component } from '@angular/core';
import { FormsComponent } from "../forms/forms.component";
import { medicalShift } from '../../core/Models/medicalShift.model';
import { ListViewComponent } from '../list-view/list-view.component';

export enum PAGES {
  LIST = 'list',
  FORMS = 'forms'
}

@Component({
  selector: 'app-main',
  imports: [FormsComponent, ListViewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  pageSelected: PAGES = PAGES.LIST;

  medicalShiftSelected: medicalShift | undefined = undefined;
  accessCodeSelected: string  = '';
  changePage(page: PAGES) {
    this.pageSelected = page;
  }

  onOpenForm($accessCode: string) {
    this.accessCodeSelected = $accessCode;
    this.changePage(PAGES.FORMS);
  }
}

