import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminGruposComponent } from './admin/admin-grupos/admin-grupos.component';
import { AdminAsignaturasComponent } from './admin-asignaturas/admin-asignaturas.component';
import { AsignacionGruposComponent } from './asignacion-grupos/asignacion-grupos.component';
import { UsuarioPorGrupoComponent } from './usuario-por-grupo/usuario-por-grupo.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasEnOfertaComponent,
    AdminUsuariosComponent,
    AdminGruposComponent,
    AdminAsignaturasComponent,
    AsignacionGruposComponent,
    UsuarioPorGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
