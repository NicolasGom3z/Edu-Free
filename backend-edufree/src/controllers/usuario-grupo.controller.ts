import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Grupo,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioGrupoController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Grupo> {
    return this.usuarioRepository.grupo(id);
  }
}
