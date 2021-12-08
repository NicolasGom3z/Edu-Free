import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-grupos',
  templateUrl: './asignacion-grupos.component.html',
  styleUrls: ['./asignacion-grupos.component.scss']
})
export class AsignacionGruposComponent implements OnInit {

  listaAsignaturas :any = [];
  listaAsignaciones :any = [];
  listaAsignaturasGrupo:any = [];
  formGroupAsignaturasGrupo:any;
  modoEdicion = false;
  id = '';


  constructor(public servicioBackend : BackendService,
              private formBuilder:FormBuilder) { 

              this.obtenerAsignaturas();

              }

  ngOnInit(): void {
  }

  obtenerAsignaturas():void{

    this.servicioBackend.getRequest('asignaturas').subscribe({

        next :(datos) => {
          this.listaAsignaturas= datos;
        
        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }


  obtenerAsignaciones(id:string):void{

    this.servicioBackend.getRequest(`asignaturas/${id}/grupos`).subscribe({

        next :(datos) => {
          this.listaAsignaciones= datos;
          
        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }

  crearAsignacion(id:string){
    
    const asignatura = this.formGroupAsignaturasGrupo.getRawValue();

    this.servicioBackend.postRequest(`asignaturas/${id}/grupos`,JSON.stringify(asignatura)).subscribe(

      {
        
        next :(nuevaAsignacion) => {
          this.listaAsignaturasGrupo.push(nuevaAsignacion);
          
          Swal.fire(
            'Todo bien!',
            'Asignatura agregada',
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
              'Asignatura no agregada',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );
  }

  entrarModoEdicion(asignacion:any):void{

    this.formGroupAsignaturasGrupo.patchValue(asignacion);
    this.id = asignacion.id;
    this.modoEdicion = true;
  }

  editarAsignacion(id:string):void{

    const asignatura = this.formGroupAsignaturasGrupo.getRawValue();
    
    this.servicioBackend.patchRequest(`asignaturas/${id}/grupos`, this.id,JSON.stringify(asignatura)).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Asignatura Editada',
            'success'
          )
          this.obtenerAsignaciones(id);
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
              'Asignatura no editada',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );

  }


  eliminarAsignacion(id:string):void{


    this.servicioBackend.deleteRequest2(`asignaturas`, id).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Grupo Eliminado',
            'success'
          )
          this.obtenerAsignaciones(id);
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
              'Asignatura no eliminada',
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
