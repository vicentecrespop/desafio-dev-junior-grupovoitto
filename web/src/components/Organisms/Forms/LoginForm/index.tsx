import React, { useState } from 'react'
import api from '@/services/api'

import {
    Form,
    Container,
    Label,
    Input,
    Button
} from '../UserForm/styles'

import { toast } from 'react-toastify';

const LoginForm: React.FC = props => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const login = async (e) => {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        await api
            .post('login', data)
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
                    props.Authenticate(data.admin, data.token)
                }
            })
            .catch(e => {
                toast(`${e}`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: 'error',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  });
            })
    }


    return (
        <>
            <Form onSubmit={login}>
                <Container>
                    <Label>E-mail:</Label>
                    <Input type="email" name="email" id="email" onChange={null} placeholder="Digite o seu e-mail" />
                </Container>
                <Container>
                    <Label>Senha:</Label>
                    <Input type="password" name="password" id="password" onChange={null} placeholder="Digite a sua senha" />
                </Container>
                <Button type='submit' name='submit'>Enviar</Button>
            </Form>
        </>
    )
}

export default LoginForm;