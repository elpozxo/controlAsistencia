import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {
  myForm: FormGroup;
  ya: boolean = false;
  constructor(
    public fb: FormBuilder,
    private servi:ServiciosService) {
    this.myForm = this.fb.group({
      documento: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      tipoEvento: ['Ingreso', Validators.required],
    });
  }
  ngOnInit() {}

  onSubmit() {
    this.ya = true; 
    if (this.myForm.valid) {
      this.servi.alerta("Enviando al servidor","Guardando...",0);
      this.servi.guardarEvento(this.myForm.value).subscribe(
        (ok:any)=>{
          if(ok.codigo==0){
            this.servi.alerta(ok.mensaje,"Agregado!",2);
          }
          else{
            this.servi.alerta(ok.mensaje,"Error al agregar!",3);
          }
        },
        (er:any)=>{ 
          this.servi.alerta(er.error.mensaje,"Error!",3);
        }
      )
      // Realizar acciones cuando se envía el formulario
    }
    else{
      this.servi.alerta("Uff!, no puede registrar este evento. " ,"Error en el Documento",3)
    }
  }
}
