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
import {PerfilPorModulos} from '../models';
import {PerfilPorModulosRepository} from '../repositories';

export class PerfilPorModulosController {
  constructor(
    @repository(PerfilPorModulosRepository)
    public perfilPorModulosRepository : PerfilPorModulosRepository,
  ) {}

  @post('/perfil-por-modulos')
  @response(200, {
    description: 'PerfilPorModulos model instance',
    content: {'application/json': {schema: getModelSchemaRef(PerfilPorModulos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PerfilPorModulos, {
            title: 'NewPerfilPorModulos',
            exclude: ['id'],
          }),
        },
      },
    })
    perfilPorModulos: Omit<PerfilPorModulos, 'id'>,
  ): Promise<PerfilPorModulos> {
    return this.perfilPorModulosRepository.create(perfilPorModulos);
  }

  @get('/perfil-por-modulos/count')
  @response(200, {
    description: 'PerfilPorModulos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PerfilPorModulos) where?: Where<PerfilPorModulos>,
  ): Promise<Count> {
    return this.perfilPorModulosRepository.count(where);
  }

  @get('/perfil-por-modulos')
  @response(200, {
    description: 'Array of PerfilPorModulos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PerfilPorModulos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PerfilPorModulos) filter?: Filter<PerfilPorModulos>,
  ): Promise<PerfilPorModulos[]> {
    return this.perfilPorModulosRepository.find(filter);
  }

  @patch('/perfil-por-modulos')
  @response(200, {
    description: 'PerfilPorModulos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PerfilPorModulos, {partial: true}),
        },
      },
    })
    perfilPorModulos: PerfilPorModulos,
    @param.where(PerfilPorModulos) where?: Where<PerfilPorModulos>,
  ): Promise<Count> {
    return this.perfilPorModulosRepository.updateAll(perfilPorModulos, where);
  }

  @get('/perfil-por-modulos/{id}')
  @response(200, {
    description: 'PerfilPorModulos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PerfilPorModulos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PerfilPorModulos, {exclude: 'where'}) filter?: FilterExcludingWhere<PerfilPorModulos>
  ): Promise<PerfilPorModulos> {
    return this.perfilPorModulosRepository.findById(id, filter);
  }

  @patch('/perfil-por-modulos/{id}')
  @response(204, {
    description: 'PerfilPorModulos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PerfilPorModulos, {partial: true}),
        },
      },
    })
    perfilPorModulos: PerfilPorModulos,
  ): Promise<void> {
    await this.perfilPorModulosRepository.updateById(id, perfilPorModulos);
  }

  @put('/perfil-por-modulos/{id}')
  @response(204, {
    description: 'PerfilPorModulos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perfilPorModulos: PerfilPorModulos,
  ): Promise<void> {
    await this.perfilPorModulosRepository.replaceById(id, perfilPorModulos);
  }

  @del('/perfil-por-modulos/{id}')
  @response(204, {
    description: 'PerfilPorModulos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perfilPorModulosRepository.deleteById(id);
  }
}
