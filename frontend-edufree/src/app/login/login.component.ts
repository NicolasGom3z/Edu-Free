import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

interface Usuario {
  codigo : string,
  password : string
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentProfile = '';
  listaUsuarios:any = [];
  formLogin:any;

  constructor(
    
    private formBuilder:FormBuilder,
    private servicioBackend: BackendService,
    private router : Router
    ) {

    this.formLogin = this.formBuilder.group({
      codigo: ['',Validators.required],
      password: ['',Validators.required]
    });

    

  }

  ngOnInit(): void {
  }

  login():void{

    let cadena:string = this.formLogin.controls.codigo.value;
    let posicion = cadena.indexOf('admin');
    if (posicion != -1) {
      this.servicioBackend.adminProfile = true;
    }else{
      this.servicioBackend.adminProfile = false;

    }
    console.log( this.servicioBackend.adminProfile );
    const encryptedPassword = Md5.hashStr(this.formLogin.controls.password.value);
    const credenciales = this.formLogin.getRawValue();
    credenciales.password = encryptedPassword;

    this.servicioBackend.authenticateRequest(JSON.stringify(credenciales)).subscribe(

      {
        
        next :(datos : any) => {
          
          const token = datos['tk'];
          localStorage.setItem('tokenedu',token);
          this.servicioBackend.isAuthenticate = true;
          this.servicioBackend.token = token;

          if (this.servicioBackend.adminProfile) {
            this.router.navigate(['admin/admin-usuarios']);
          }else{
            this.router.navigate(['programas-en-oferta']);
          }
        


          Swal.fire(
            'Bienvenido!',
            'Tu acceso ha sido valido',
            'success'
          )


        },
        error : (e:any) => {
          console.log(e);
          
          Swal.fire(
            'Error!',
            'Datos erroneos',
            'error'
          )
        },
        
        complete : ()=>{

        
        }
      }

    )

  }

  
}
