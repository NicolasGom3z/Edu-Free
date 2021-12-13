import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Credenciales } from '../models';
import { SeguridadService } from '../services';

export class LoginController {
  constructor(
    
    @service(SeguridadService)
    public servicioSeguridad:SeguridadService
  ) {}


  @post('/autenticar',
  {
    responses:{
      '200': {
        description:"ok"
      }
    }
  })
  async login(@requestBody() credenciales:Credenciales ){

    let usuarioEncontrado = await this.servicioSeguridad.ValidarUsuario(credenciales);

    if(usuarioEncontrado){

      const token = await this.servicioSeguridad.GenerarToken(usuarioEncontrado);

      if(token){
        return {
          data: usuarioEncontrado, 
          tk : token
        }

      }else{
        throw new HttpErrors[401]('Datos Invalidos');
      }

      
    }else{

      throw new HttpErrors[401]('Datos Invalidos');

    }

  }

}
