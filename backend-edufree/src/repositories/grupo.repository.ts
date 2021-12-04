import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Asignatura, Usuario, UsuariosPorGrupo} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {UsuariosPorGrupoRepository} from './usuarios-por-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuariosPorGrupo,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('UsuariosPorGrupoRepository') protected usuariosPorGrupoRepositoryGetter: Getter<UsuariosPorGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupo, dataSource);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuariosPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
