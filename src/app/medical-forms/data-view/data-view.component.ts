import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-view',
  imports: [],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {


  @Input() idQR:number = -1;


  constructor() { }
}
