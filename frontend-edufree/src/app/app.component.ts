import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-edufree';

  constructor(public servicioBackend:BackendService,
              private router:Router          
    ){

    
  }

  cerrarSesion(){
    this.servicioBackend.token = '';
    this.servicioBackend.isAuthenticate = false;
    localStorage.removeItem('tokenedu');
    this.router.navigate(['/login']);
  }
}
