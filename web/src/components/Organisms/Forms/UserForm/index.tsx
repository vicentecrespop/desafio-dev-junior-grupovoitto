import React, {useState} from 'react'
import api from '@/services/api'

import {
    Form,
    Container,
    Label,
    Input,
    Button
} from './styles'
import { toast } from 'react-toastify'

const UserForm: React.FC = props => {

    const register = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        }

        await api 
            .post('register', data)
            .then(res => res.data)
            .then(data => {
                if(data.error) {
                    toast(`${data.error}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        type: 'error',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      });
                } else {
                    toast(`${data.msg}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        type: 'success',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      });
                    setTimeout(() => {
                        props.Register()
                    }, 2000)
                }
            })
    }

    const update = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        }

        // get token
        const token = props.token

        await api 
            .patch('users', data)
    }


    return (
        <>
        <Form onSubmit={props.page === 'register' ? register : update}>
          <Input type="hidden" name="id" id="id"  />
          <Container>
              <Label >Nome:</Label>
              <Input type="text" id="name" name="name"  placeholder="Digite o seu nome." />
          </Container>
          <Container>
              <Label>E-mail:</Label>
              <Input type="text" id="email" name="email"  placeholder="Digite o seu email." />
          </Container>
          <Container>
              <Label>Senha:</Label>
              <Input type="password" id="password" name="password"  placeholder="Digite a sua senha." />
          </Container>
          <Container>
              <Label>Confirmação de senha:</Label>
              <Input type="password" id="confirmPassword" name="confirmPassword"  placeholder="Confirme a sua senha." />
          </Container>
          <Button type='submit' name='submit'>Enviar</Button>
      </Form>
        </>
    )
}

export default UserForm