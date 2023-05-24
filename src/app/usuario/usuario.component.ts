import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../servicios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  @ViewChild('editButtonTemplate', { static: true })
  editButtonTemplate: TemplateRef<any> | undefined = undefined;
  data = [];
  columns: any[] = [];
  text: String = 'Editar';
  formulario: FormGroup;
  formulario1: FormGroup;
  constructor(
    public fb: FormBuilder,
    private servi: ServiciosService,
    private modalService: NgbModal
  ) {
    this.formulario1 = this.fb.group({
      searchQuery: ['', Validators.required],
      searchBy: ['documento', Validators.required],
    });
    this.formulario = this.fb.group({
      id: [''],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoDocumento: ['', Validators.required],
      primerNombre: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      primerApellido: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      foto: [''],
    });
  }
  get PERS() {
    return this.formulario.controls;
  }
  get BUSCAR() {
    return this.formulario1.controls;
  }

  ngOnInit() {
    this.columns = [
      { prop: 'id', name: 'ID' },
      { prop: 'documento', name: 'Documento' },
      { prop: 'tipoDocumento', name: 'Tipo D.' },
      { prop: 'primerNombre', name: 'Nombre' },
      { prop: 'primerApellido', name: 'Apellido' },
      { prop: 'telefono', name: 'Celular' },
      { prop: 'sexo', name: 'Sexo' },
      { prop: 'correo', name: 'Correo' },
      { prop: 'foto', name: 'foto' },
      { name: 'Acciones', cellTemplate: this.editButtonTemplate },
    ];
    this.consultarTodolosuser();
  }
  consultarTodolosuser() {
    this.servi.alerta('Cargando informacion de los usuarios', 'Cargand..', 0);
    this.servi.userAll().subscribe(
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
  modalRef:any;
  openEditModal(content: any, row: any) {
    this.text = 'Agregar';
    this.PERS['documento'].enable();
    if (row != null) {
      this.text = 'Editar';
      this.PERS['id'].setValue(row.id);
      this.PERS['documento'].setValue(row.documento);
      this.PERS['documento'].disable();
      this.PERS['tipoDocumento'].setValue(row.tipoDocumento);
      this.PERS['primerNombre'].setValue(row.primerNombre);
      this.PERS['primerApellido'].setValue(row.primerApellido);
      this.PERS['telefono'].setValue(row.telefono);
      this.PERS['sexo'].setValue(row.sexo);
      this.PERS['correo'].setValue(row.correo);
      this.PERS['foto'].setValue(row.foto);
    } else {
      this.formulario.reset();
    }
    this.modalRef = this.modalService.open(content, { centered: true });
  }
  guardarCambios() {
    this.PERS['documento'].enable();
    if (this.formulario.invalid) {
      return this.servi.alerta(
        'Error en el formulario, por favor revise',
        'formulario error',
        3
      );
    }
    this.servi.alerta('Guardando la informacion', this.text + ' Persona', 0);
    if (this.text == 'Agregar') {
      this.servi.AgregarPersona(this.formulario.value).subscribe(
        (ok: any) => {
          if (ok.codigo == 0) {
            this.servi.alerta('Agregado corectamente', 'Ok', 2);
          } else {
            this.servi.alerta(ok.mensaje, 'Error', 3);
          }
          this.consultarUser();
        },
        (er: any) => {
          this.servi.alerta(er.error.mensaje, 'Error!', 3);
        }
      );
    } else {
      this.servi
        .EditarPersona(this.formulario.value, this.PERS['documento'].value)
        .subscribe(
          (ok: any) => {
            if (ok.codigo == 0) {
              this.servi.alerta('Editado corectamente', 'Ok', 2);
            } else {
              this.servi.alerta(ok.mensaje, 'Error', 3);
            }
            this.consultarUser();
          },
          (er: any) => {
            this.servi.alerta(er.error.mensaje, 'Error!', 3);
          }
        );
    }
  }
  consultarUser() {
    this.formulario.reset();
    this.modalRef.close();
    if (this.BUSCAR['searchQuery'].value.length == 0)
      this.BUSCAR['searchQuery'].setValue('-1');
    this.servi
      .userall(this.BUSCAR['searchBy'].value, this.BUSCAR['searchQuery'].value)
      .subscribe(
        (ok: any) => {
          if (ok.codigo == 0) {
            this.servi.alerta('Informacion consultada con exito', 'Ok', 2);
            this.data = ok.dato;
          } else {
            this.servi.alerta(ok.mensaje, 'Error', 3);
          }
          this.BUSCAR['searchQuery'].setValue('');
        },
        (er: any) => {
          this.servi.alerta(er.error.mensaje, 'Error!', 3);
        }
      );
  }
  eliminar(row: any) {
    this.servi
      .delete('Seguro desea eliminar a ' + row.documento, 'Seguro eliminar?', 1)
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.eliminarUser(row.documento);
        } else if (result.dismiss) {
          this.servi.alerta('Ok cancelamos, por poco y si', 'Cancelado', 2);
        }
      });
  }
  eliminarUser(documento: any) {
    this.servi.EliminarUser(documento).subscribe(
      (ok: any) => {
        if (ok.codigo == 0) {
          this.servi.alerta('User eliminado', 'Ok', 2);
        } else {
          this.servi.alerta(ok.mensaje, 'Error', 3);
        }
        this.consultarUser();
      },
      (er: any) => {
        this.servi.alerta(er.error.mensaje, 'Error!', 3);
      }
    );
  }
}
