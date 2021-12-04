import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {InventarioModulo, InventarioModuloRelations} from '../models';

export class InventarioModuloRepository extends DefaultCrudRepository<
  InventarioModulo,
  typeof InventarioModulo.prototype.id,
  InventarioModuloRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(InventarioModulo, dataSource);
  }
}
