import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SidebarService } from '../../sidebar.service';
import { Md5 } from 'ts-md5';



@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  tiposUsuarioFiltro = [
    {
      codigo:'Todos',
      texto :'Todos'
    },
    {
      codigo:'Estudiante',
      texto :'Estudiante'
    },
    {
      codigo:'Docente',
      texto :'Docente'
    },
    {
      codigo:'Administrador',
      texto :'Administrador'
    }
  ]


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

  listaProgramas: any = [];
  listaTodosProgramas: any = [];
  listaUsuarios:any = [];
  listaTodosLosusuarios:any = [];
  formGroupUsuario:any;
  tipoUsuario:any = '';
  tipoFiltro:any = '';
  modoEdicion = false;
  id = '';


  constructor(public servicioBackend : BackendService,
              private formBuilder:FormBuilder,
              private sidebarService:SidebarService
    ) { 
    
    this.sidebarService.rutaActual = '/admin/admin-usuarios';
    this.obtenerUsuarios();
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

  ngOnInit(): void {
  }

  crearUsuario(){

    const usuario = this.formGroupUsuario.getRawValue();
    usuario['password'] = Md5.hashStr(usuario['password']);
    usuario["perfilAsignado"] = this.obtenerTipo(usuario['perfilId']);

    this.servicioBackend.postRequest('usuarios',JSON.stringify(usuario)).subscribe(

      {
        
        next :(nuevoUsuario) => {
          this.listaUsuarios.push(nuevoUsuario);
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



  obtenerUsuarios():void{

    this.servicioBackend.getRequest('usuarios').subscribe({

        next :(datos) => {
          this.listaUsuarios= datos;
          this.listaTodosLosusuarios = datos;
        },
        error : (e:any) => {
          console.log(e);
          this.servicioBackend.autorized = false;
          
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
    // usuario["perfilId"] = this.tipoUsuario;
    usuario["perfilAsignado"] = this.obtenerTipo(usuario['perfilId']);
    usuario['password'] = Md5.hashStr(usuario['password']);


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

            this.servicioBackend.autorized = false;
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

  filtroUsuarioPorTipo():void{

    if (this.tipoFiltro == 'Todos') {
      this.listaUsuarios = this.listaTodosLosusuarios;
    }else{

      const datosFiltrados = this.listaTodosLosusuarios.filter(
        (usuario:any) =>
  
        usuario.perfilAsignado == this.tipoFiltro);
  
      this.listaUsuarios = datosFiltrados;
    }

    

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
          this.listaTodosProgramas = datos;

        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }


}
