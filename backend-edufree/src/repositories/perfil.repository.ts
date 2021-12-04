import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Perfil, PerfilRelations, Usuario, InventarioModulo, PerfilPorModulos} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PerfilPorModulosRepository} from './perfil-por-modulos.repository';
import {InventarioModuloRepository} from './inventario-modulo.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id,
  PerfilRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Perfil.prototype.id>;

  public readonly inventarioModulos: HasManyThroughRepositoryFactory<InventarioModulo, typeof InventarioModulo.prototype.id,
          PerfilPorModulos,
          typeof Perfil.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PerfilPorModulosRepository') protected perfilPorModulosRepositoryGetter: Getter<PerfilPorModulosRepository>, @repository.getter('InventarioModuloRepository') protected inventarioModuloRepositoryGetter: Getter<InventarioModuloRepository>,
  ) {
    super(Perfil, dataSource);
    this.inventarioModulos = this.createHasManyThroughRepositoryFactoryFor('inventarioModulos', inventarioModuloRepositoryGetter, perfilPorModulosRepositoryGetter,);
    this.registerInclusionResolver('inventarioModulos', this.inventarioModulos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
