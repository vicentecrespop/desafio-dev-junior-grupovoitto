import Aluno from '../../models/Aluno';
import CursoAluno from '../../models/CursoAluno';
import getUserByToken from '../../helpers/getUserByToken';

class AtribuirCursoAlunoService {
  async read(req, res) {
      const alunoId = req.params.id
      try {
          const cursosAluno = await CursoAluno.findAll({ where: { id_pessoa: alunoId }})
          return res.json(cursosAluno)
      } catch(e) {
          return res.json({ error: e.parent.sqlMessage })
      }
  }

  async create(req, res) {
      const token = req.header('auth-token')
      const user = await getUserByToken(token)
      if(!user.admin) {
          return res.json({ error: 'Você não possui permissão fazer executar tarefa!' })
      }
      const alunoId = req.params.id
      const cursoId = req.body.cursoId
      const curso = await CursoAluno.findOne({ where: { id_pessoa: alunoId, id_curso: cursoId }})
      if(curso) {
          return res.json({ error: 'Aluno já possui esse curso cadastrado.' })
      }

      try {
          await CursoAluno.create({ id_pessoa: alunoId, id_curso: cursoId })
          return res.json({ msg: 'Curso adicionado ao aluno com sucesso!'})
      } catch(e) {
          return res.json({ error: e.parent.sqlMessage })
      }
  }

  async delete(req, res) {
      const token = req.header('auth-token')
      const user = await getUserByToken(token)
      if(!user.admin) {
          return res.json({ error: 'Você não possui permissão fazer executar tarefa!' })
      }        
      const alunoId = req.params.id
      const cursoId = req.body.cursoId

      if(!cursoId) {
          return res.json({ error: 'Por favoor, informe o curso que deseja remover.' })
      }

      try {
          await CursoAluno.destroy({ where: {id_pessoa: alunoId, id_curso: cursoId }})
              .then(rowsDeleted => {
                  if(rowsDeleted === 0) {
                      return res.json({ error: 'Curso ou Aluno informado incorretos! '})
                  }
                  return res.json({ msg: 'Curso de aluno removido com sucesso! '})
              })
      } catch(e) {
          return res.json({ error: e.parent.sqlMessage })
      }
  }
}

export default new AtribuirCursoAlunoService();

// class AtribuirCursoAlunoService {
//   async execute({ id_aluno, id_curso }) {
//     // TODO
//     return true;
//   }
// }

// export default new AtribuirCursoAlunoService();
