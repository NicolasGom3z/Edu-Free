import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';
import { SidebarService } from '../sidebar.service';

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
              private formBuilder:FormBuilder,
              private sidebarService:SidebarService
  ){ 
    this.sidebarService.rutaActual = 'admin-asignaturas';
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

  verProgramName(id:string):any{
    
    for (let programa of this.listaProgramas) {
      if(programa['id'] == id){

        return programa['nombre'];

      }
    }
    
  }

  crearAsignatura(){
    
    const asignatura = this.formGroupAsignatura.getRawValue();

    this.servicioBackend.postRequest('asignaturas',JSON.stringify(asignatura)).subscribe(

      {
        
        next :(nuevaAsignatura) => {
          this.listaAsignaturas.push(nuevaAsignatura);
          this.formGroupAsignatura.reset();
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
          this.formGroupAsignatura.reset();
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

  close(){
    console.log('close');
    this.formGroupAsignatura.reset();
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
