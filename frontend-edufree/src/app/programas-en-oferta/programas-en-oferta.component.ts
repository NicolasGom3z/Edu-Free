import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SidebarService } from '../sidebar.service';


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

  listaProgramas:any = [];
  listaTodosProgramas:any = [];
  programaActual = '';

  constructor(
    private sidebarService:SidebarService,
    private servicioBackend:BackendService) {

    this.sidebarService.rutaActual = 'programas-en-oferta';
    
    // this.servicioBackend.getRequest('programa-academicos').subscribe(
    //   {
    //     next :(datos) => {
    //       this.listaProgramas=datos;
    //     },
    //     error : (e:any) => {
    //       console.log(e);
    //     },
        
    //     complete : ()=>{

        
    //     }
        

    //   }
    // )

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


  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    
    
  }
  ngAfterViewInit(): void {
    
    
  }

}
