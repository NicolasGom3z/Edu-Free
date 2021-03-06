import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { Credenciales } from '../models/credenciales.model';
import { UsuarioRepository } from '../repositories/usuario.repository';

const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {

  llaveSecreta : string = '@ksufidhu%bw&iudib232e#$';

  constructor(
    @repository(UsuarioRepository) public usuarioRepositorio : UsuarioRepository
    
    
  ) {}

  async ValidarUsuario(credenciales:Credenciales){

    try {
      
      let usuarioEncontrado = await this.usuarioRepositorio.findOne(
        {
          where: {
            codigo : credenciales.codigo,
            password : credenciales.password
          }
        }
      );

      if(usuarioEncontrado){
        return usuarioEncontrado;
      }else{
        return false
      }

    } catch (error) {
      return false;
    }

  }

  async GenerarToken(usuario : Usuario){

    try {
      const token = jwt.sign({
        email : usuario.email,
        nombre : usuario.nombre
      }, this.llaveSecreta);
      return token;
    } catch (error) {
      return false;
    }


  }

  VerificarToken(token : string){

    try {
      
      const datos = jwt.verify(token, this.llaveSecreta)
      return datos;
    } catch (error) {
      return false;
    }

  }

}
