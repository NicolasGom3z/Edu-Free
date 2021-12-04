import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuariosPorGrupo, UsuariosPorGrupoRelations} from '../models';

export class UsuariosPorGrupoRepository extends DefaultCrudRepository<
  UsuariosPorGrupo,
  typeof UsuariosPorGrupo.prototype.id,
  UsuariosPorGrupoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuariosPorGrupo, dataSource);
  }
}
