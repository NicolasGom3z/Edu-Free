import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  

  tiposUsuario = [
    {
      codigo:'estudiante',
      texto :'Estudiante'
    },
    {
      codigo:'docente',
      texto :'Docente'
    },
    {
      codigo:'administrador',
      texto :'Administrador'
    }
  ]

  listaUsuarios:any = [];
  formGroupUsuario:any;
  tipo:any = '';
  modoEdicion = false;
  id = '';


  constructor(public servicioBackend : BackendService,
              private formBuilder:FormBuilder
    ) { 

    this.obtenerUsuarios();

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

  ngOnInit(): void {
  }

  crearUsuario(){

    if (!this.tipo) {
      Swal.fire(
        'Alerta!',
        'Selecciona un tipo de Usuario',
        'warning'
      );
      return;
    }
    
    const usuario = this.formGroupUsuario.getRawValue();
    usuario["perfilAsignado"] = this.tipo;
  

    this.servicioBackend.postRequest('usuarios',JSON.stringify(usuario)).subscribe(

      {
        
        next :(nuevoUsuario) => {
          this.listaUsuarios.push(nuevoUsuario);
          
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



  obtenerUsuarios():void{

    this.servicioBackend.getRequest('usuarios').subscribe({

        next :(datos) => {
          this.listaUsuarios= datos;
        
        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }

  entrarModoEdicion(usuario:any):void{

    this.formGroupUsuario.patchValue(usuario);
    this.id = usuario.id;
    this.modoEdicion = true;
  }

  editarUsuario():void{

    const usuario = this.formGroupUsuario.getRawValue();
    usuario["perfilAsignado"] = this.tipo;
  

    this.servicioBackend.patchRequest('usuarios', this.id,JSON.stringify(usuario)).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Usuario Editado',
            'success'
          )
          this.obtenerUsuarios();
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
              'Usuario no editado',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );

  }

  eliminarUsuario(id:string):void{


    this.servicioBackend.deleteRequest('usuarios', id).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Usuario Eliminado',
            'success'
          )
          this.obtenerUsuarios();
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
              'Usuario no eliminado',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );

  }

}
