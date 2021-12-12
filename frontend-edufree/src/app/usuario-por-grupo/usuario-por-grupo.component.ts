import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-usuario-por-grupo',
  templateUrl: './usuario-por-grupo.component.html',
  styleUrls: ['./usuario-por-grupo.component.scss']
})
export class UsuarioPorGrupoComponent implements OnInit {

  constructor(private servicioBackend:BackendService) {
    
    this.obtenerUsuarios();
    this.obtenerGrupos();
    this.obtenerUsuariosPorGrupo();
  }

  ngOnInit(): void {
  }

  listaTodosLosUsuarios = [];
  listaGrupos = [];
  listaUsuariosPorGrupo = [];

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

    // const filtro = {"include":[{"relation":"usuarios"}]};


    this.servicioBackend.getRequest('grupos').subscribe({

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

    this.servicioBackend.getRequest('usuarios-por-grupos').subscribe({

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


  crearRelacion(){
    console.log('si');
  }

}
