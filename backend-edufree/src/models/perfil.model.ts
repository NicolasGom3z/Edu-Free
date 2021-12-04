import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {InventarioModulo} from './inventario-modulo.model';
import {PerfilPorModulos} from './perfil-por-modulos.model';

@model()
export class Perfil extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => InventarioModulo, {through: {model: () => PerfilPorModulos}})
  inventarioModulos: InventarioModulo[];

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
