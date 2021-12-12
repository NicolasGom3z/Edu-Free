import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutenticarGuard implements CanActivate,CanActivateChild {

  constructor(
        private router:Router,
        private servicioBackend:BackendService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.servicioBackend.isAuthenticate) {
        return true;
      }else{

        Swal.fire(
          'Ups!',
          'No tiene una sesion aciva',
          'error'
        );
        
        this.router.navigate(['/login'])
        return false;

      }

      
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.servicioBackend.isAuthenticate) {
        return true;
      }else{

        Swal.fire(
          'Ups!',
          'No tiene una sesion aciva',
          'error'
        );
        
        this.router.navigate(['/login'])
        return false;

      }

      
  }
  
}
