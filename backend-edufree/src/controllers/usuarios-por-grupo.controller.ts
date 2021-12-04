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
import {UsuariosPorGrupo} from '../models';
import {UsuariosPorGrupoRepository} from '../repositories';

export class UsuariosPorGrupoController {
  constructor(
    @repository(UsuariosPorGrupoRepository)
    public usuariosPorGrupoRepository : UsuariosPorGrupoRepository,
  ) {}

  @post('/usuarios-por-grupos')
  @response(200, {
    description: 'UsuariosPorGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuariosPorGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosPorGrupo, {
            title: 'NewUsuariosPorGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    usuariosPorGrupo: Omit<UsuariosPorGrupo, 'id'>,
  ): Promise<UsuariosPorGrupo> {
    return this.usuariosPorGrupoRepository.create(usuariosPorGrupo);
  }

  @get('/usuarios-por-grupos/count')
  @response(200, {
    description: 'UsuariosPorGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuariosPorGrupo) where?: Where<UsuariosPorGrupo>,
  ): Promise<Count> {
    return this.usuariosPorGrupoRepository.count(where);
  }

  @get('/usuarios-por-grupos')
  @response(200, {
    description: 'Array of UsuariosPorGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuariosPorGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuariosPorGrupo) filter?: Filter<UsuariosPorGrupo>,
  ): Promise<UsuariosPorGrupo[]> {
    return this.usuariosPorGrupoRepository.find(filter);
  }

  @patch('/usuarios-por-grupos')
  @response(200, {
    description: 'UsuariosPorGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosPorGrupo, {partial: true}),
        },
      },
    })
    usuariosPorGrupo: UsuariosPorGrupo,
    @param.where(UsuariosPorGrupo) where?: Where<UsuariosPorGrupo>,
  ): Promise<Count> {
    return this.usuariosPorGrupoRepository.updateAll(usuariosPorGrupo, where);
  }

  @get('/usuarios-por-grupos/{id}')
  @response(200, {
    description: 'UsuariosPorGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuariosPorGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuariosPorGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuariosPorGrupo>
  ): Promise<UsuariosPorGrupo> {
    return this.usuariosPorGrupoRepository.findById(id, filter);
  }

  @patch('/usuarios-por-grupos/{id}')
  @response(204, {
    description: 'UsuariosPorGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosPorGrupo, {partial: true}),
        },
      },
    })
    usuariosPorGrupo: UsuariosPorGrupo,
  ): Promise<void> {
    await this.usuariosPorGrupoRepository.updateById(id, usuariosPorGrupo);
  }

  @put('/usuarios-por-grupos/{id}')
  @response(204, {
    description: 'UsuariosPorGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuariosPorGrupo: UsuariosPorGrupo,
  ): Promise<void> {
    await this.usuariosPorGrupoRepository.replaceById(id, usuariosPorGrupo);
  }

  @del('/usuarios-por-grupos/{id}')
  @response(204, {
    description: 'UsuariosPorGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosPorGrupoRepository.deleteById(id);
  }
}
