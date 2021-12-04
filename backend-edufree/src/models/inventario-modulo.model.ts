import {Entity, model, property} from '@loopback/repository';

@model()
export class InventarioModulo extends Entity {
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


  constructor(data?: Partial<InventarioModulo>) {
    super(data);
  }
}

export interface InventarioModuloRelations {
  // describe navigational properties here
}

export type InventarioModuloWithRelations = InventarioModulo & InventarioModuloRelations;
