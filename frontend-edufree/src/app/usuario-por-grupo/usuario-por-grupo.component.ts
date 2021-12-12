import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-por-grupo',
  templateUrl: './usuario-por-grupo.component.html',
  styleUrls: ['./usuario-por-grupo.component.scss']
})
export class UsuarioPorGrupoComponent implements OnInit {
  listaTodosLosUsuarios:any = [];
  listaGrupos:any = [];
  listaRelaciones:any = [];
  listaUsuariosPorGrupo :any= [];
  listaUsuariosGrupo:any = [];
  listaProgramas:any =[];
  formGroupUsuariosGrupo:any;
  grupoActual:any = '';
  constructor(private servicioBackend:BackendService,
              private formBuilder:FormBuilder) {
    

    this.formGroupUsuariosGrupo = this.formBuilder.group({
  
      grupoId: ['',Validators.required],
      usuarioId: ['',Validators.required],
      programaAcademico : ['',Validators.required],
      calificaciones : ['',Validators.required],

    });
    
    this.obtenerUsuarios();
    this.obtenerGrupos();
    this.obtenerProgramas();
    this.obtenerUsuariosPorGrupo();
  }

  ngOnInit(): void {
  }



  obtenerUsuarios():void{

    this.servicioBackend.getRequest('usuarios').subscribe({

        next :(datos) => {
          
          this.listaTodosLosUsuarios = datos;
        },
        error : (e:any) => {
          console.log(e);
          this.servicioBackend.autorized = false;
          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  





  }

  obtenerGrupos():void{

    const filtro = {"include":[{"relation":"usuarios"}]};


    this.servicioBackend.getRequestfilter('grupos',JSON.stringify(filtro)).subscribe({

        next :(datos) => {
          this.listaGrupos= datos;
          

        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }



  obtenerUsuariosPorGrupo():void{

    const filtro = {"where" : {"usuarioId": "61a6a08fca947d106cca2691"}}

    this.servicioBackend.getRequestfilter('usuarios-por-grupos',JSON.stringify(filtro)).subscribe({

      next :(datos) => {
        
        this.listaUsuariosPorGrupo = datos;
      },
      error : (e:any) => {
        console.log(e);
        this.servicioBackend.autorized = false;
        
      },
      
      complete : ()=>{

      
      }
      

    
    
  })

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


  crearRelacion(){
    
    const relacion = this.formGroupUsuariosGrupo.getRawValue();
    

    this.servicioBackend.postRequest('usuarios-por-grupos',JSON.stringify(relacion)).subscribe(

      {
        
        next :(nuevaRelacion) => {
          this.listaGrupos.push(nuevaRelacion);
          this.formGroupUsuariosGrupo.reset();
          Swal.fire(
            'Todo bien!',
            'Grupo asignado',
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


  

}
