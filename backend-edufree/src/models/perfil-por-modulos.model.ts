import {Entity, model, property} from '@loopback/repository';

@model()
export class PerfilPorModulos extends Entity {
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
  perfilId: string;

  @property({
    type: 'string',
    required: true,
  })
  moduloId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  create: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  delete: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  edit: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  read: boolean;

  @property({
    type: 'string',
  })
  inventarioModuloId?: string;

  constructor(data?: Partial<PerfilPorModulos>) {
    super(data);
  }
}

export interface PerfilPorModulosRelations {
  // describe navigational properties here
}

export type PerfilPorModulosWithRelations = PerfilPorModulos & PerfilPorModulosRelations;
