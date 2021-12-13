import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-edufree';
  formGroupUsuario:any;
  listaProgramas:any;
  tiposUsuario = [
  
    {
      codigo:'618f2842b975f117ac3e6be0',
      texto :'Estudiante'
    },
    {
      codigo:'618fdf9b5b5b3f2b0474fff5',
      texto :'Docente'
    },
    {
      codigo:'618fe8525b5b3f2b0474fff7',
      texto :'Administrador'
    }
  ]

  constructor(public servicioBackend:BackendService,
              public sidebarService:SidebarService,
              private formBuilder:FormBuilder,
              private router:Router          
    ){

    this.obtenerProgramas();
      
    this.formGroupUsuario = this.formBuilder.group({
  
      codigo: ['',Validators.required],
      nombre: ['',Validators.required],
      apellidos : ['',Validators.required],
      edad : ['',Validators.required],
      telefono : ['',Validators.required],
      direccion : ['',Validators.required],
      sexo : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      creditos : ['',Validators.required],
      programaAcademicoId : ['',Validators.required],
      perfilId :['',Validators.required],
      perfilAsignado:['']

    });
  }

  cerrarSesion(){
    this.servicioBackend.token = '';
    this.servicioBackend.isAuthenticate = false;
    localStorage.removeItem('tokenedu');
    this.router.navigate(['/login']);
  }


  crearCuenta(){

    const usuario = this.formGroupUsuario.getRawValue();
    usuario["perfilAsignado"] = 'Estudiante';
    usuario["perfilId"] = '618f2842b975f117ac3e6be0';
    usuario['password'] = Md5.hashStr(usuario['password']);
    
    
    // if (usuario["perfilAsignado"]) {
    //   Swal.fire(
    //     'Alerta!',
    //     'Selecciona un tipo de Usuario',
    //     'warning'
    //   );
    //   return;
    // }
    

    this.servicioBackend.postRequest('usuarios',JSON.stringify(usuario)).subscribe(

      {
        
        next :(nuevoUsuario) => {
          // this.listaUsuarios.push(nuevoUsuario);
          this.formGroupUsuario.reset();
          Swal.fire(
            'Todo bien!',
            'Usuario agregado',
            'success'
          )
        },
        error : (e:any) => {
          console.log(e);

          if(e.statusCode == 401){

            this.servicioBackend.autorized = true;
            Swal.fire(
              'Error',
              'Usuario no autorizado',
              'error'
            )


          }else{
            Swal.fire(
              'Upss!',
              'Usuario no agregado',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );
  }

  obtenerTipo(id:string):any{

    for (let tipo of this.tiposUsuario) {
      
      if (tipo['codigo'] == id) {
        
        return tipo['texto'];

      }
    
    }

  }


  obtenerProgramas():void{

    this.servicioBackend.getRequest('programa-academicos').subscribe({

        next :(datos) => {
          this.listaProgramas= datos;
        

        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }

}
