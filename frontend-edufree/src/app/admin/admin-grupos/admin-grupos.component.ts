import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../../backend.service';
import Swal from 'sweetalert2';
import { SidebarService } from 'src/app/sidebar.service';

@Component({
  selector: 'app-admin-grupos',
  templateUrl: './admin-grupos.component.html',
  styleUrls: ['./admin-grupos.component.scss']
})
export class AdminGruposComponent implements OnInit {

  listaGrupos:any = [];
  listaAsignaturasGrupo:any = [];
  listaAsignaturas:any = [];
  listaUsuarios :any =[];
  listaProgramas :any =[];
  grupoActual ='';
  listaUsuariosGrupo :any =[];
  listaTodosLosUsuarios :any =[];
  listaTodosLosGrupos:any =[];
  usuariosPorGrupo:any =[];
  formGroupGrupo:any;
  formGroupAsignaturasGrupo:any;
  formGroupUsuariosGrupo:any;
  modoEdicion = false;
  id = '';

  constructor(public servicioBackend : BackendService,
              private sidebarService:SidebarService,
              private formBuilder:FormBuilder
  ) { 
    
    this.sidebarService.rutaActual = '/admin/admin-grupos';
    this.obtenerAsignaturas();
    this.obtenerGrupos();
    
    this.formGroupGrupo = this.formBuilder.group({
  
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      horario : ['',Validators.required],
      asignaturaId : ['',Validators.required],

    });

    
    this.formGroupUsuariosGrupo = this.formBuilder.group({
  
      grupoId: ['',Validators.required],
      usuarioId: ['',Validators.required],
      programaAcademico : ['',Validators.required],
      calificaciones : ['',Validators.required],

    });

    this.obtenerGrupos();
    this.obtenerUsuarios();
    this.obtenerProgramas();

    // this.formGroupAsignaturasGrupo= this.formBuilder.group({
  
    //   asignaturaId : ['',Validators.required]

    // });




    }

              
  ngOnInit(): void {
  }


  obtenerGrupos():void{

    const filtro = {"include":[{"relation":"usuarios"}]};

    this.servicioBackend.getRequestfilter('grupos',JSON.stringify(filtro)).subscribe({

        next :(datos) => {
          this.listaGrupos= datos;
          this.listaTodosLosGrupos = datos;

        },
        error : (e:any) => {
          console.log(e);

          
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }

  
  crearGrupo(){
    
    const grupo = this.formGroupGrupo.getRawValue();

    this.servicioBackend.postRequest('grupos',JSON.stringify(grupo)).subscribe(

      {
        
        next :(nuevoGrupo) => {
          this.listaGrupos.push(nuevoGrupo);
          
          Swal.fire(
            'Todo bien!',
            'Grupo agregado',
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
              'Grupo no agregado',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );
  }

  entrarModoEdicion(grupo:any):void{

    this.formGroupGrupo.patchValue(grupo);
    this.id = grupo.id;
    this.modoEdicion = true;
  }

  editarGrupo():void{

    const grupo = this.formGroupGrupo.getRawValue();
    
  

    this.servicioBackend.patchRequest('grupos', this.id,JSON.stringify(grupo)).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Grupo Editado',
            'success'
          )
          this.obtenerGrupos();
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


  eliminarGrupo(id:string):void{


    this.servicioBackend.deleteRequest('grupos', id).subscribe(

      {
        
        next :(datos) => {
          
          Swal.fire(
            'Todo bien!',
            'Grupo Eliminado',
            'success'
          )
          this.obtenerGrupos();
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
              'Grupo no eliminado',
              'error'
            )
          }

        },
        
        complete : ()=>{

        
        }
      }
      
    );

  }

  asignarAsignatura(){
    
    const asignatura = this.formGroupAsignaturasGrupo.getRawValue();

    this.servicioBackend.postRequest(`asignaturas/${this.id}/grupos`,JSON.stringify(asignatura)).subscribe(

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


  verUsuarios(grupo:any){
    
    this.grupoActual = grupo;
    this.listaUsuariosGrupo = grupo.usuarios;




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

  obtenerUsuariosPorGrupo(){

    
    this.servicioBackend.getRequest('usuarios-por-grupos').subscribe({

      next :(datos) => {
        this.usuariosPorGrupo= datos;
        

      },
      error : (e:any) => {
        console.log(e);

        
      },
      
      complete : ()=>{

      
      }
      

    
    
  })


  }

  obtenerNotas(id:string){

    for (let usuario of this.usuariosPorGrupo) {
      

      if (usuario.usuarioId == id) {
        
        return usuario.calificaciones;

      }

    }
    
  }

  
  obtenerUsuarios():void{

    this.servicioBackend.getRequest('usuarios').subscribe({

        next :(datos) => {
          this.listaUsuarios= datos;
        },
        error : (e:any) => {
          console.log(e);
          this.servicioBackend.autorized = false;
          
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
