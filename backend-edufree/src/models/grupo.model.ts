import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Usuario} from './usuario.model';
import {UsuariosPorGrupo} from './usuarios-por-grupo.model';

@model()
export class Grupo extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  @hasMany(() => Usuario, {through: {model: () => UsuariosPorGrupo}})
  usuarios: Usuario[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
