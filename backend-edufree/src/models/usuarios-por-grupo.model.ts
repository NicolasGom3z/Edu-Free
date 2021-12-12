import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuariosPorGrupo extends Entity {
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
  grupoId: string;

  @property({
    type: 'string',
    required: true,
  })
  usuarioId: string;

  @property({
    type: 'string',
    required: true,
  })
  programaAcademico: string;

  @property({
    type: 'string',
  })
  calificaciones?: string;


  constructor(data?: Partial<UsuariosPorGrupo>) {
    super(data);
  }
}

export interface UsuariosPorGrupoRelations {
  // describe navigational properties here
}

export type UsuariosPorGrupoWithRelations = UsuariosPorGrupo & UsuariosPorGrupoRelations;
