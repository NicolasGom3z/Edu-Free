import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InventarioModulo} from '../models';
import {InventarioModuloRepository} from '../repositories';

export class InventarioModuloController {
  constructor(
    @repository(InventarioModuloRepository)
    public inventarioModuloRepository : InventarioModuloRepository,
  ) {}

  @post('/inventario-modulos')
  @response(200, {
    description: 'InventarioModulo model instance',
    content: {'application/json': {schema: getModelSchemaRef(InventarioModulo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioModulo, {
            title: 'NewInventarioModulo',
            exclude: ['id'],
          }),
        },
      },
    })
    inventarioModulo: Omit<InventarioModulo, 'id'>,
  ): Promise<InventarioModulo> {
    return this.inventarioModuloRepository.create(inventarioModulo);
  }

  @get('/inventario-modulos/count')
  @response(200, {
    description: 'InventarioModulo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InventarioModulo) where?: Where<InventarioModulo>,
  ): Promise<Count> {
    return this.inventarioModuloRepository.count(where);
  }

  @get('/inventario-modulos')
  @response(200, {
    description: 'Array of InventarioModulo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventarioModulo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InventarioModulo) filter?: Filter<InventarioModulo>,
  ): Promise<InventarioModulo[]> {
    return this.inventarioModuloRepository.find(filter);
  }

  @patch('/inventario-modulos')
  @response(200, {
    description: 'InventarioModulo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioModulo, {partial: true}),
        },
      },
    })
    inventarioModulo: InventarioModulo,
    @param.where(InventarioModulo) where?: Where<InventarioModulo>,
  ): Promise<Count> {
    return this.inventarioModuloRepository.updateAll(inventarioModulo, where);
  }

  @get('/inventario-modulos/{id}')
  @response(200, {
    description: 'InventarioModulo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventarioModulo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InventarioModulo, {exclude: 'where'}) filter?: FilterExcludingWhere<InventarioModulo>
  ): Promise<InventarioModulo> {
    return this.inventarioModuloRepository.findById(id, filter);
  }

  @patch('/inventario-modulos/{id}')
  @response(204, {
    description: 'InventarioModulo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioModulo, {partial: true}),
        },
      },
    })
    inventarioModulo: InventarioModulo,
  ): Promise<void> {
    await this.inventarioModuloRepository.updateById(id, inventarioModulo);
  }

  @put('/inventario-modulos/{id}')
  @response(204, {
    description: 'InventarioModulo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventarioModulo: InventarioModulo,
  ): Promise<void> {
    await this.inventarioModuloRepository.replaceById(id, inventarioModulo);
  }

  @del('/inventario-modulos/{id}')
  @response(204, {
    description: 'InventarioModulo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventarioModuloRepository.deleteById(id);
  }
}
