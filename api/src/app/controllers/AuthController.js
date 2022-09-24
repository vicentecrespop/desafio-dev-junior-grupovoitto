import Users from "../models/User";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import getUserByToken from "../helpers/getUserByToken";
require('dotenv').config()

class AuthController {
    async index(req, res) {
        const users = await Users.findAll()
        res.json(users)
    }

    async read(req, res) {
        try {
            const user = await Users.findOne({ where: { id: req.params.id } })
            if(user === null) {
                return res.json({ error: 'Usuário não encontrado!' })
            }
            res.json(user)
        } catch(e) {
            res.json({ error: e.parent.sqlMessage })
        }
    }

    async register(req, res) {
        // get user
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const admin = false

        // check for required fields
        if(!name || !email || !password || !confirmPassword ) {
            return res.json({ error: 'Preencha todos os campos!' })
        }

        // confirm password validation
        if(password !== confirmPassword) {
            return res.json({ error: 'As senhas não conferem!' })
        }

        if(password.length < 8) {
            return res.json({ error: 'A senha deve conter pelo menos 8 dígitos!'})
        }

        // verify user email
        const emailExists = await Users.findOne({ where: { email: req.body.email } })
        if(emailExists != null) {
            return res.json({ error: 'O e-mail informado já está em uso.' })
        }

        // create password hash
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = {
            name,
            email,
            password: passwordHash,
            admin
        }
        try {
            await Users.create(user)
            return res.json({ msg: 'Usuário Cadastrado com sucesso!' })
        } catch(e) {
            return res.json({ error: e })
        }
    }

    async update(req, res) {
        const token = req.header('auth-token')
        const user = await getUserByToken(token)
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        const updatedUser = {
            name,
            email
        }

        // check if passwords match
        if(password !== confirmPassword) {
            return res.json({ error: 'As senhas não conferem.' })
        }

        if(password !== null && password.length >= 8) {
            // create password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            updatedUser.password = passwordHash
        } else {
            return res.json({ error: 'A senha deve conter pelo menos 8 dígitos.'})
        }

        try {
            await Users.update(updatedUser, {where: { id: user.id }})
                .then(rows => rows[0])
                .then(rowsUpdated => {
                    if(rowsUpdated === 0) {
                        return res.json({ error: 'Nenhum dado da tabela foi atualizado!'})
                    }
                    res.json({ msg: 'Usuário atualizado com sucesso!' }) 
                })
        } catch(e) {
            res.json({ error: e.parent.sqlMessage })
        }
    }

    // async delete(req, res) {
    //     try {
    //         await Users.destroy({ where: { id: req.params.id } })
    //             .then(rowsDeleted => {
    //                 if(rowsDeleted === 0) {
    //                     return res.status(400).json({ error: `Usuário com id: ${req.params.id} não encontrado!`})
    //                 }
    //                 res.status(200).json({ msg: 'Usuário removido com sucesso!' })
    //             })
    //     } catch(e) {
    //         res.status(500).json({ error: e.parent.sqlMessage })
    //     }
    // }

    async login(req, res) {
        const email = req.body.email
        const password = req.body.password

        // check for required fields
        if(!email || !password) {
            return res.json({ error: 'Preencha todos os campos!' })
        }

        // check if user exists
        const user = await Users.findOne({ where: { email: email } })

        if(user == null) {
            return res.json({ error: 'Não há usuários cadastrados com este e-mail.' })
        }

        // check if passowrd match
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log(checkPassword)
        if(!checkPassword) {
            return res.json({ error: 'Senha inválida!' })
        }

        // create token 
        const token = jwt.sign(
            // payload data
            {
            name: user.name,
            id: user.id,
            },
            process.env.APP_SECRET
        )

        // return token
        res.json({ error: null, msg: 'Você está autenticado!', token: token, userId: user.id, admin: user.admin })
    }
}

export default new AuthController();