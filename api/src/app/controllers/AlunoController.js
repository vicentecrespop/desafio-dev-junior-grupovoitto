import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll()
    res.json(alunos);
  }

  async read(req, res) {
    try {
      const aluno = await Aluno.findOne({ where: { id: req.params.id }})
      if(aluno === null) {
        return res.status(400).json({ error: 'Aluno não encontrado.'})
      }
      res.status(200).json(aluno) 
    } catch(e) {
      return res.status(500).json({ error: e.parent.sqlMessage})
    }
    
  }

  async create(req, res) {
    const nome = req.body.nome
    const email = req.body.email
    const cep = req.body.cep
    const estado = req.body.estado
    const cidade = req.body.cidade
    if(!nome || !email || !cep || !estado || !cidade) {
      return res.json({ error: 'Por favor, preencha todos os campos.'})
    }
    const aluno = {nome, email, cep, estado, cidade}

    try {
      const alunoInserido = await Aluno.create(aluno)
      res.status(201).json({msg: `Aluno de id: ${alunoInserido.id} criado com sucesso!` })
    } catch(e) {
      return res.status(500).json({error: e.parent.sqlMessage})
    }
  }

  async update(req, res) {
    const nome = req.body.nome
    const email = req.body.email
    const cep = req.body.cep
    const estado = req.body.estado
    const cidade = req.body.cidade
    if(!nome || !email || !cep || !estado || !cidade) {
      return res.json({ error: 'Por favor, preencha todos os campos.'})
    }

    const dadosAtualizados = {nome, email, cep, estado, cidade}

    try {
      await Aluno.update(dadosAtualizados, { where: { id: req.params.id } })
        .then(rows => rows[0])
        .then(rowsUpdated => {
          if(rowsUpdated === 0) {
            return res.status(400).json({ error: 'Nenhum dado da tabela foi atualizado!' })
          }
          res.status(200).json({ msg: 'Aluno atualizado com sucesso!' })
        })
    } catch(e) {
      return res.status(500).json({ error: e.parent.sqlMessage })
    }
  }

  async delete(req, res) {
    try {
      await Aluno.destroy({ where: { id: req.params.id } })
      .then(rowsDeleted => {
        if(rowsDeleted === 0) {
          return res.status(400).json({ error: `Aluno de id: ${req.params.id} não encontrado!` })
        } 
        res.status(200).json({msg: 'Aluno removido com sucesso!'})
      })
    } catch(e) {
      return res.status(500).json({ error: e.parent.sqlMessage })
    }
  }
}

export default new AlunoController();
