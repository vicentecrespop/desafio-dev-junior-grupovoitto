import Curso from "../models/Curso";
import getUserByToken from "../helpers/getUserByToken";

class CursoController {
    async read(req, res) {
        const cursos = await Curso.findAll()
        res.json(cursos)
    }

    async create(req, res) {
        const token = req.header('auth-token')
        const user = await getUserByToken(token)
        if(!user.admin) {
            return res.json({ error: 'Você não possui permissão fazer executar tarefa!' })
        }
        const cursos = await Curso.findAll()
        const novoCurso = req.body.curso
        const exists = cursos.some(element => element.nome === novoCurso)

        if(exists) {
            return res.json({ error: 'O curso inserido já está cadastrado!'})
        } 

        if(!novoCurso) {
            return res.json({ error: 'Curso inserido inválido!' })
        }

        try {
            await Curso.create({ nome: novoCurso })
            return res.json({ msg: 'Curso cadastrado com sucesso!' })
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
        const cursoId = req.params.id

        try {
            await Curso.destroy({ where: { id: cursoId } })
            .then(rowsDeleted => {
                if(rowsDeleted === 0) {
                    return res.json({ error: 'Curso não encontrado!' })
                } else {
                    return res.json({ msg: 'Curso apagado com sucesso!'})
                }
            })
        } catch(e) {
            return res.json({ error: e.parent.sqlMessage })
        }
    }
}

export default new CursoController();