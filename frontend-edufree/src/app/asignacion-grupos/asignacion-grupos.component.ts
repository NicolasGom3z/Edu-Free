import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-asignacion-grupos',
  templateUrl: './asignacion-grupos.component.html',
  styleUrls: ['./asignacion-grupos.component.scss']
})
export class AsignacionGruposComponent implements OnInit {

  listaAsignaturas :any = [];
  listaAsignaciones :any = [];
  listaProgramas:any = [];
  listaAsignaturasGrupo:any = [];
  formGroupAsignaturasGrupo:any;
  modoEdicion = false;
  id = '';


  constructor(public servicioBackend : BackendService,
              private sideBarService:SidebarService) { 
              
  this.sideBarService.rutaActual = 'grupos-asignados';

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
