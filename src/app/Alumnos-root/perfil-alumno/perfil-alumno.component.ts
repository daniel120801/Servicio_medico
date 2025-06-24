import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../../core/Models/alumno.model';
import { AlumnosService } from '../../core/services/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormAlumnosAddDocumentComponent } from "../form-alumnos-add-document/form-alumnos-add-document.component";
import { FileUpload } from '../../core/Utilities/FileUpload';
import { Documento } from '../../core/Models/Documento.model';

@Component({
  selector: 'app-perfil-alumno',
  imports: [CommonModule, FormAlumnosAddDocumentComponent],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {


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
        

        const blob = new Blob([fileContent], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
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
        if(this.alumno){
          this.alumno.documentos.push(new Documento(-1,response.fileName))
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

