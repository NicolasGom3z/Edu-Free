import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminGruposComponent } from './admin-grupos/admin-grupos.component';
import { AdminAsignaturasComponent } from './admin-asignaturas/admin-asignaturas.component';
import { AsignacionGruposComponent } from './asignacion-grupos/asignacion-grupos.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path: 'login', 
    component : LoginComponent
  },
  {
    path: 'programas-en-oferta',
    component: ProgramasEnOfertaComponent
  },
  {
    path: 'admin-usuarios',
    component : AdminUsuariosComponent
  },
  {
    path: 'admin-grupos',
    component : AdminGruposComponent
  },
  {
    path: 'admin-asignaturas',
    component : AdminAsignaturasComponent
  },
  {
    path: 'grupos-asignados',
    component : AsignacionGruposComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
