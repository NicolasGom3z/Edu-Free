import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Perfil,
PerfilPorModulos,
InventarioModulo,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilInventarioModuloController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/inventario-modulos', {
    responses: {
      '200': {
        description: 'Array of Perfil has many InventarioModulo through PerfilPorModulos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InventarioModulo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InventarioModulo>,
  ): Promise<InventarioModulo[]> {
    return this.perfilRepository.inventarioModulos(id).find(filter);
  }

  @post('/perfils/{id}/inventario-modulos', {
    responses: {
      '200': {
        description: 'create a InventarioModulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(InventarioModulo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioModulo, {
            title: 'NewInventarioModuloInPerfil',
            exclude: ['id'],
          }),
        },
      },
    }) inventarioModulo: Omit<InventarioModulo, 'id'>,
  ): Promise<InventarioModulo> {
    return this.perfilRepository.inventarioModulos(id).create(inventarioModulo);
  }

  @patch('/perfils/{id}/inventario-modulos', {
    responses: {
      '200': {
        description: 'Perfil.InventarioModulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioModulo, {partial: true}),
        },
      },
    })
    inventarioModulo: Partial<InventarioModulo>,
    @param.query.object('where', getWhereSchemaFor(InventarioModulo)) where?: Where<InventarioModulo>,
  ): Promise<Count> {
    return this.perfilRepository.inventarioModulos(id).patch(inventarioModulo, where);
  }

  @del('/perfils/{id}/inventario-modulos', {
    responses: {
      '200': {
        description: 'Perfil.InventarioModulo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InventarioModulo)) where?: Where<InventarioModulo>,
  ): Promise<Count> {
    return this.perfilRepository.inventarioModulos(id).delete(where);
  }
}
