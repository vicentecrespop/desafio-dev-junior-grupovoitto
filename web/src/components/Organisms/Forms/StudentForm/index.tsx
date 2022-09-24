import React, { useState, setState } from 'react'

import {
    Form,
    Label,
    Input,
    SubmitButton
} from './styles'

import { api } from '@/services/api'
import { toast } from 'react-toastify';

const StudentForm: React.FC = props => {
    const [nome, setNome] = useState(props.aluno.nome)
    const [email, setEmail] = useState(props.aluno.email)
    const [cep, setCep] = useState(props.aluno.cep)
    const [estado, setEstado] = useState(props.aluno.estado)
    const [cidade, setCidade] = useState(props.aluno.cidade)
    let aluno ={
        id: props.aluno.id,
        nome: props.aluno.nome,
        email: props.aluno.email,
        cep: props.aluno.cep,
        estado: props.aluno.estado,
        cidade: props.aluno.cidade
    }

    const adicionarAluno = async (aluno: Student): void => {
        api
            .post('alunos', aluno)
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
                    props.closeModal()
                }
            })
            .then(() => props.carregarAlunos())
    }

    const editarAluno = async (aluno: Student): void => {
        await api
            .patch(`alunos/${aluno.id}`, aluno)
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
                    props.closeModal()
                }
            })
            .then(() => props.carregarAlunos())
    }

    const excluirAluno = async (aluno: Student): void => {
        await api
            .delete(`alunos/${aluno.id}`)
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
                }
                props.closeModal()
            })
            .then(() => props.carregarAlunos())
    }

    const enviarFormulario = (e): void => {
        e.preventDefault()

        if(props.formType !== 'Excluir') {
            aluno = {
                id: e.target.id.value,
                nome: e.target.nome.value,
                email: e.target.email.value,
                cep: e.target.cep.value,
                estado: e.target.estado.value,
                cidade: e.target.cidade.value
            }
        }

        const formAction = props.formType === 'Adicionar' ? 
            adicionarAluno(aluno) : props.formType === 'Editar' ?
            editarAluno(aluno) : excluirAluno(aluno)

    }
    

    return (
            <>
            <Form onSubmit={enviarFormulario}>
                {props.formType === 'Excluir' ? (
                    <>
                        <Label>
                            Nome: 
                            <Input value={nome} type="text" disabled/>
                        </Label>
                    </>
                ) : (
                <>
                    <Input type='hidden' value={props.aluno.id} name="id"/>
                    <Label>
                        Nome:
                        <Input type="text" name='nome' placeholder='Digite seu nome.' value={nome} onChange={e => setNome(e.target.value)}/>
                    </Label>
                    <Label>
                        E-mail:
                        <Input type="email" name='email' placeholder='Digite seu e-mail.' value={email} onChange={e => setEmail(e.target.value)}/>
                    </Label>
                    <Label>
                        CEP:
                        <Input type="text" name='cep' placeholder='Informe seu CEP.' value={cep} onChange={e => setCep(e.target.value)}/>
                    </Label>
                    <Label>
                        Estado:
                        <Input type="text" name='estado' placeholder='Informe a sigla do seu Estado.' value={estado} onChange={e => setEstado(e.target.value)}/>
                    </Label>
                    <Label>
                        Cidade:
                        <Input type="text" name='cidade' placeholder='Digite sua Cidade.' value={cidade} onChange={e => setCidade(e.target.value)}/>
                    </Label>
                </>
                )}
                <SubmitButton type="submit" name="submit" value={props.formType}/>
            </Form>
            </>
    )
}

export default StudentForm