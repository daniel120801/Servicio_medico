import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../../core/Models/alumno.model';
import { AlumnosService } from '../../core/services/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormAlumnosAddDocumentComponent } from "../form-alumnos-add-document/form-alumnos-add-document.component";
import { FileUpload } from '../../core/Utilities/FileUpload';
import { Documento } from '../../core/Models/Documento.model';

/**
 * Componente que gestiona el perfil de un alumno, permitiendo visualizar y administrar documentos,
 * así como navegar entre diferentes secciones relacionadas al alumno.
 *
 * @remarks
 * Este componente se encarga de mostrar la información general del alumno, gestionar la subida y descarga de documentos,
 * y emitir eventos para navegar a otras vistas como el seguimiento médico y conferencias asistidas.
 *
 * @example
 * ```html
 * <app-perfil-alumno [alumno]="alumnoSeleccionado"
 *                    (volverEvent)="onVolver()"
 *                    (openSegMedicoEvent)="onAbrirSegMedico()"
 *                    (openConferAsisEvent)="onAbrirConferencias()">
 * </app-perfil-alumno>
 * ```
 *
 * @property {EventEmitter<void>} volverEvent - Evento emitido para regresar a la vista anterior.
 * @property {EventEmitter<void>} openSegMedicoEvent - Evento emitido para abrir la sección de seguimiento médico.
 * @property {EventEmitter<void>} openConferAsisEvent - Evento emitido para abrir la sección de conferencias asistidas.
 * @property {FileUpload | undefined} file - Archivo seleccionado para subir.
 * @property {Alumno | null} alumno - Información del alumno a mostrar y gestionar.
 * @property {any} generals - Información general adicional del alumno.
 * @property {boolean} showModal - Indica si el modal para agregar documentos está visible.
 *
 * @method ngOnInit Inicializa el componente y verifica la existencia del alumno.
 * @method onOpenSegMedico Emite el evento para abrir la sección de seguimiento médico.
 * @method onOpenConferAsistidas Emite el evento para abrir la sección de conferencias asistidas.
 * @method volver Emite el evento para regresar a la vista anterior.
 * @method showDocument Descarga y muestra el documento seleccionado del alumno.
 * @method onAddDocument Sube un nuevo documento y actualiza la lista de documentos del alumno.
 * @method onChangeVisibilityModal Cambia la visibilidad del modal para agregar documentos.
 *
 * @dependencies
 * - AlumnosService: Servicio para gestionar operaciones relacionadas con alumnos y documentos.
 * - FormAlumnosAddDocumentComponent: Componente para el formulario de subida de documentos.
 * - CommonModule: Módulo común de Angular.
 *
 * @see Alumno
 * @see Documento
 */
@Component({
  selector: 'app-perfil-alumno',
  imports: [CommonModule, FormAlumnosAddDocumentComponent],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css', '../../../styles.css']
})
export class PerfilAlumnoComponent implements OnInit {
  fileError: boolean = false;;
  

  //#region Variables
  @Output() volverEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openSegMedicoEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openConferAsisEvent: EventEmitter<void> = new EventEmitter<void>();
  file: FileUpload | undefined;
  @Input() alumno: Alumno | null = null;
  generals: any = null;
  showModal: boolean = false;
  //#endregion

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit(): void {
    if (!this.alumno) {

      this.volver();
    }
  }
  onAccept() {
    this.fileError = false;
  }

  onOpenSegMedico() {
    this.openSegMedicoEvent.emit();
  }
  onOpenConferAsistidas() {
    this.openConferAsisEvent.emit();
  }
  volver() {
    this.volverEvent.emit()
  }
  showDocument(fileName: string) {
    if (!this.alumno) return;
    this.alumnosService.getFile(fileName, this.alumno.matricula).subscribe({
      next: (fileContent) => {
        if (fileContent == null) {
          console.log('documento no existente');
          this.fileError = true;
          return;
        }

        const blob = new Blob([fileContent]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);
      },
      error: (error) => {
        console.error('Error al obtener el archivo:', error);
      }

    });
  }
  onAddDocument(form: FormData) {

    if (!this.alumno) return;

    form.append('mtr', this.alumno.matricula)

    this.alumnosService.uploadDocument(form).subscribe({
      next: (response) => {
        this.onChangeVisibilityModal(false);

        //TODO:agregar que cuando el documento se sube, actualize la lista de documentos para mostrar los nuevos valores
        if (this.alumno) {
          this.alumno.documentos.push(new Documento(-1, response.data['fileName']))
        }



      },
      error: (error) => {
        console.error(error);

      }
    });
  }

  onChangeVisibilityModal(show: boolean) {
    this.showModal = show;
  }

}

