import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-asignaturas',
  templateUrl: './admin-asignaturas.component.html',
  styleUrls: ['./admin-asignaturas.component.scss']
})
export class AdminAsignaturasComponent implements OnInit {

  listaProgramas:any = [];
  listaAsignaturas:any = [];
  formGroupAsignatura:any;
  modoEdicion = false;
  id = '';

  constructor(public servicioBackend : BackendService,
              private formBuilder:FormBuilder
  ){ 

    this.obtenerProgramas();
    this.obtenerAsignaturas();
    this.formGroupAsignatura = this.formBuilder.group({
  
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      creditos : ['',Validators.required],
      programaAcademicoId : ['',Validators.required],

    });

    

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

  obtenerProgramas(){

    this.servicioBackend.getRequest('programa-academicos').subscribe(
      {
        next :(datos) => {
          this.listaProgramas=datos;
          // console.log(this.listaProgramas);
        
          

        },
        error : (e:any) => {
          console.log(e);
        },
        
        complete : ()=>{

        
        }
        

      }
    )

  }

  mostrarNombrePrograma(id:string):any{
    let nombre = '';
    for (let index = 0; index < this.listaProgramas.length; index++) {
      const element = this.listaProgramas[index];
      console.log(element['id']);
      if (id == element['id']) {
        nombre = element['nombre']
        return nombre;
      }else{
        return false;
      }

      
    }
    
  }

  crearAsignatura(){
    
    const asignatura = this.formGroupAsignatura.getRawValue();

    this.servicioBackend.postRequest('asignaturas',JSON.stringify(asignatura)).subscribe(

      {
        
        next :(nuevaAsignatura) => {
          this.listaAsignaturas.push(nuevaAsignatura);
          
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

  entrarModoEdicion(asignatura:any):void{

    this.formGroupAsignatura.patchValue(asignatura);
    this.id = asignatura.id;
    this.modoEdicion = true;
  }

  editarAsignatura():void{

    const asignatura = this.formGroupAsignatura.getRawValue();
    
    this.servicioBackend.patchRequest('asignaturas', this.id,JSON.stringify(asignatura)).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Asignatura Editada',
            'success'
          )
          this.obtenerAsignaturas();
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


  eliminarAsignatura(id:string):void{


    this.servicioBackend.deleteRequest('asignaturas', id).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Grupo Eliminado',
            'success'
          )
          this.obtenerAsignaturas();
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

  verPrograma(id:any){

    let currentProgram:any;

    for (const programa of this.listaProgramas) {

      if (programa.id == id) {
        
        currentProgram = programa.nombre;
        
        return currentProgram;

      }
    }

  }


}
