import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}
  //para mostrar alert
  alerta(text: string, titulo: string, i: number) {
    let img: SweetAlertIcon = 'success';
    let boton = false;
    let time = 4321;
    if (i == 0) {
      //cargando
      img = 'question';
    }
    if (i == 1) {
      //cargando
      img = 'question';
    } else if (i == 2) {
      //Ok
      img = 'success';
      time = 2345;
      boton = true;
    } else if (i == 3) {
      img = 'error';
      boton = true;
    } else if (i == 4) {
      img = 'error';
    }
    Swal.fire({
      icon: img,
      title: titulo,
      text: text,
      timer: time,
      timerProgressBar: true,
      showConfirmButton: boton,
    }).then(() => {
      if (i == 4) {
        localStorage.clear();
        window.location.href = '/';
      }
      if (i == 0) this.alerta(text, titulo, i);
    });
  }
  delete(text: string, titulo: string, i: number) {
    let img: SweetAlertIcon = 'success';
    let boton = false;
    if (i == 0) {
      //cargando
      img = 'question';
    }
    if (i == 1) {
      //cargando
      img = 'question';
    } else if (i == 2) {
      //Ok
      img = 'success';
      boton = true;
    } else if (i == 3) {
      img = 'error';
      boton = true;
    } else if (i == 4) {
      img = 'error';
    }
    return Swal.fire({
      icon: img,
      title: titulo,
      text: text,
      timerProgressBar: false,
      showConfirmButton: true, 
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }) 
  }

  guardarEvento(value: any) { 
    return this.http.post(this.url + 'controlEvento', value);
  }

  userAll() {
    return this.http.get(this.url + 'personas');
  }
  userall(por: String, value: String) {
    return this.http.get(this.url + 'personas/' + por + '/' + value);
  }

  EditarPersona(value: any, documento: String) {
    return this.http.put(this.url + 'personas/' + documento, value);
  }

  AgregarPersona(value: any) {
    return this.http.post(this.url + 'personas', value);
  }
  
  EliminarUser(documento: any) {
    return this.http.delete(this.url + 'personas/' + documento);
  }
  
  Evento(value: String) {
    return this.http.get(this.url + 'controlEvento/'+ value);
  }
  Eventos() {
    return this.http.get(this.url + 'controlEvento/');
  }
}
