import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasEnOfertaComponent,
    AdminUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
