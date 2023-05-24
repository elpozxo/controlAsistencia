import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './plantilla/menu/menu.component';
import { FluterComponent } from './plantilla/fluter/fluter.component';
import { ControlComponent } from './control/control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventoComponent } from './evento/evento.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FluterComponent,
    ControlComponent,
    UsuarioComponent,
    EventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
