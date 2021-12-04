import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  tiposUsuario = [
    {
      codigo:'estudiante',
      texto :'Estudiante'
    },
    {
      codigo:'docente',
      texto :'Docente'
    },
    {
      codigo:'administrador',
      texto :'Administrador'
    }
  ]

  listaUsuarios:any = [];
  formGroupUsuario:any;
  tipo:any = '';

  constructor(private servicioBackend : BackendService,
              private formBuilder:FormBuilder
    ) { 

    this.obtenerUsuarios();

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
    usuario["perfilAsignado"] = this.tipo;
  

    this.servicioBackend.postRequest('usuarios',JSON.stringify(usuario)).subscribe(

      {
        
        next :(datos) => {
          this.listaUsuarios.push(usuario);
        },
        error : (e:any) => {
          console.log(e);
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
        },
        error : (e:any) => {
          console.log(e);
        },
        
        complete : ()=>{

        
        }
        

      
      
    })

  }

  

}
