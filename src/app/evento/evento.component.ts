import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  @ViewChild('editButtonTemplate', { static: true })
  editButtonTemplate: TemplateRef<any> | undefined = undefined;
  data = [];
  columns: any[] = []; 
  formulario1: FormGroup;
  constructor(
    public fb: FormBuilder,
    private servi: ServiciosService
  ) {
    this.formulario1 = this.fb.group({
      searchQuery: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    }); 
  }
  ngOnInit() {
    this.columns = [
      { prop: 'id', name: 'ID' },
      { prop: 'tipoEvento', name: 'Eventualidad' },
      { prop: 'fechaEvento', name: 'Fecha' }, 
      { prop: 'documento', name: 'Documento' }, 
    ]; 
    this.consultarUserAll()
  }
  get BUSCAR() {
    return this.formulario1.controls;
  }
  consultarUser() { 
    if (this.BUSCAR['searchQuery'].value.length == 0)
     return this.consultarUserAll()
    this.servi
      .Evento( this.BUSCAR['searchQuery'].value)
      .subscribe(
        (ok: any) => {
          if (ok.codigo == 0) {
            this.servi.alerta('Informacion consultada con exito', 'Ok', 2);
            this.data = ok.dato;
          } else {
            this.servi.alerta(ok.mensaje, 'Error', 3);
          } 
        },
        (er: any) => {
          this.servi.alerta(er.error.mensaje, 'Error!', 3);
        }
      );
  }
  
  consultarUserAll() {  
    this.servi
      .Eventos(  )
      .subscribe(
        (ok: any) => {
          if (ok.codigo == 0) {
            this.servi.alerta('Informacion consultada con exito', 'Ok', 2);
            this.data = ok.dato;
          } else {
            this.servi.alerta(ok.mensaje, 'Error', 3);
          } 
        },
        (er: any) => {
          this.servi.alerta(er.error.mensaje, 'Error!', 3);
        }
      );
  }
}
