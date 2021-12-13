import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';
import Swal from 'sweetalert2';


interface Programa {
  nombre:string;
  modalidad:string;

}


@Component({
  selector: 'app-programas-en-oferta',
  templateUrl: './programas-en-oferta.component.html',
  styleUrls: ['./programas-en-oferta.component.scss']
})
export class ProgramasEnOfertaComponent implements OnInit {
  
  tipoProgramas = ['Profesional','Técnico','Tecnólogo'];
  modalidades = ['Presencial','Virtual','Alternancia'];
  listaProgramas:any = [];
  listaTodosProgramas:any = [];
  programaActual = '';
  formGroupProgramas:any;
  editMode:boolean = false;
  id ='';

  constructor(
    private sidebarService:SidebarService,
    private formBuilder:FormBuilder,
    private servicioBackend:BackendService) {

    this.sidebarService.rutaActual = 'programas-en-oferta';
    
    this.formGroupProgramas = this.formBuilder.group({

      nombre: ['',Validators.required],
      fechaCreacion : ['',],
      tipo:['',Validators.required],
      creditosTotales:['',Validators.required],
      modalidad:['',Validators.required]

    })


    

    this.obtenerProgramas();


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


  verGrupos(programa:any){

    this.programaActual = programa;
    this.listaTodosProgramas = programa.asignaturas;




  }

  crearPrograma(){

    const fecha = new Date();

    const programa = this.formGroupProgramas.getRawValue();
    programa['fechaCreacion'] = fecha;
  
    this.servicioBackend.postRequest('programa-academicos',JSON.stringify(programa)).subscribe(

      {
        
        next :(nuevoPrograma) => {
          this.listaProgramas.push(nuevoPrograma);
         
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

  editarPrograma(){
    const programa = this.formGroupProgramas.getRawValue();
    // usuario["perfilId"] = this.tipoUsuario;
    // usuario["perfilAsignado"] = this.obtenerTipo(usuario['perfilId']);

    this.servicioBackend.patchRequest('programa-academicos', this.id,JSON.stringify(programa)).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Usuario Editado',
            'success'
          )
          this.obtenerProgramas();
          this.editMode=false;
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

  modoEdicion(programa:any){

    this.formGroupProgramas.patchValue(programa);
    this.id = programa.id;
    this.editMode=true;

  }

  eliminarPrograma(id:string):void{


    this.servicioBackend.deleteRequest('programa-academicos', id).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Usuario Eliminado',
            'success'
          )
          this.obtenerProgramas();
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



  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    
    
  }
  ngAfterViewInit(): void {
    
    
  }

}
