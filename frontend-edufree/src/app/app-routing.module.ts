import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
// import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminGruposComponent } from './admin/admin-grupos/admin-grupos.component';
import { AdminAsignaturasComponent } from './admin-asignaturas/admin-asignaturas.component';
import { AsignacionGruposComponent } from './asignacion-grupos/asignacion-grupos.component';
import { GuardAutenticarGuard } from './guard-autenticar.guard';
import { UsuarioPorGrupoComponent } from './usuario-por-grupo/usuario-por-grupo.component';
// import { AdminModule } from './admin/admin.module';

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
    component: ProgramasEnOfertaComponent,
    canActivate: [GuardAutenticarGuard]
  },
  
  {

    path : 'admin',
    canActivateChild: [GuardAutenticarGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'admin-grupos',
    component : AdminGruposComponent,
    canActivate: [GuardAutenticarGuard]
  },
  {
    path: 'admin-asignaturas',
    component : AdminAsignaturasComponent,
    canActivate: [GuardAutenticarGuard]
  },
  {
    path: 'grupos-asignados',
    component : AsignacionGruposComponent,
    canActivate: [GuardAutenticarGuard]
  },
  {
    path: 'usuarios-por-grupo',
    component : UsuarioPorGrupoComponent,
    canActivate: [GuardAutenticarGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
