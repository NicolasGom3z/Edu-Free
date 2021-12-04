import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PerfilPorModulos, PerfilPorModulosRelations} from '../models';

export class PerfilPorModulosRepository extends DefaultCrudRepository<
  PerfilPorModulos,
  typeof PerfilPorModulos.prototype.id,
  PerfilPorModulosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PerfilPorModulos, dataSource);
  }
}
