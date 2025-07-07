import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-status-indicator',
  standalone: true,
  templateUrl:'./field-status-indicator.component.html'
})
export class FieldStatusIndicatorComponent {
  @Input() loading: boolean = false;
  @Input() error: boolean = false;
  @Input() success: boolean = false;
  @Input() warning: boolean = false;
  @Input() warningMessage: string = '';

}
