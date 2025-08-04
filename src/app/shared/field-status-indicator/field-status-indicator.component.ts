import { Component, Input } from '@angular/core';

/**
 * Componente indicador de estado de campo.
 * 
 * Este componente muestra el estado actual de un campo, permitiendo indicar si está cargando,
 * si ocurrió un error, si la operación fue exitosa o si existe una advertencia. Puede ser utilizado
 * para mejorar la experiencia del usuario mostrando retroalimentación visual sobre el estado de un campo.
 *
 * @example
 * <app-field-status-indicator
 *   [loading]="isLoading"
 *   [error]="hasError"
 *   [success]="isSuccess"
 *   [warning]="hasWarning"
 *   [warningMessage]="warningText">
 * </app-field-status-indicator>
 *
 * @property {boolean} loading - Indica si el campo está en estado de carga.
 * @property {boolean} error - Indica si ocurrió un error en el campo.
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {boolean} warning - Indica si existe una advertencia en el campo.
 * @property {string} warningMessage - Mensaje de advertencia a mostrar cuando `warning` es verdadero.
 */
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
