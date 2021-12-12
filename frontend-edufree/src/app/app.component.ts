import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-edufree';

  constructor(public servicioBackend:BackendService,
              public sidebarService:SidebarService,
              private router:Router          
    ){

    console.log(sidebarService.rutaActual);
  }

  cerrarSesion(){
    this.servicioBackend.token = '';
    this.servicioBackend.isAuthenticate = false;
    localStorage.removeItem('tokenedu');
    this.router.navigate(['/login']);
  }
}
