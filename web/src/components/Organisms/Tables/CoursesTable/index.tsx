import React, { useState, useEffect } from 'react'

import {
    Table,
    BodyLine,
    Item,
    Head,
    TableMobile
} from '../StudentTable/styles'
import {
    ButtonsDiv,
    Button,
    Modal,
    ModalBackground,
    Container,
    SubmitButton,
    Form,
    Label,
    Select,
    ActionButton
} from './styles'
import api from '@/services/api'
import { toast } from 'react-toastify'
import useWindowSize from '@/hooks/useWindowSize';



const CoursesTable: React.FC = props => {

    const [studentCourses, setStudentCourses] = useState([])
    const [cursosDispo, setCursosDispo] = useState([])
    const [modalOpened, setModalOpened] = useState(false)
    const mobile = useWindowSize().width < 700;


    useEffect(() => {
        getStudentCourses()
    }, [])

    const openModal = () => {
        setModalOpened(true)
    }

    const closeModal = () => {
        setModalOpened(false)
    }

    const getCourses = async listaCursos => {
        const cursos = []
        await api 
            .get('cursos')
            .then(res => res.data)
            .then(data => { 
                setCursosDispo(data)
                listaCursos.forEach(id => {
                    data.forEach(curso => {
                        curso.id === id ? cursos.push(curso) : null
                    })
                })
            })
            .then(() => setStudentCourses(cursos))
    }

    const getStudentCourses = async (): void => {
        const cursosAluno = []
        await api
            .get(`cursos/aluno/${props.student.id}`)
            .then(res => res.data)
            .then(data => {
                data.forEach(curso => cursosAluno.push(curso.id_curso))
            })
            .then(() => getCourses(cursosAluno))
    }

    const removeCourse = async cursoId => {
        await api 
            .delete(`cursos/aluno/${props.student.id}`, {
                headers: {'auth-token': props.token},
                data: {cursoId}
            })
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
                closeModal()
            })
            .then(() => getStudentCourses())
            .catch(error => {
                toast(`Erro API`, {
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

    const addCourse = async (e) => {
        e.preventDefault()

        await api 
            .post(`cursos/aluno/${props.student.id}`, {cursoId: e.target.cursoSelect.value}, {
                headers: {'auth-token': props.token}
            })
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
                    closeModal()
                }
            })
            .then(() => getStudentCourses())
            .catch(error => {
                toast(`Erro API`, {
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
            <Container>
                {modalOpened && <>
                    <ModalBackground onClick={() => closeModal()}></ModalBackground>
                    <Modal>
                        <Form onSubmit={addCourse}>
                            <Label>Selecione o curso:</Label>
                            <Select name="cursoSelect" id="cursoSelect">
                                {cursosDispo.map(curso => <>
                                    <option value={curso.id}>{curso.nome}</option>
                                </>)}
                            </Select>
                            <SubmitButton type='submit'>Enviar</SubmitButton>
                        </Form>
                    </Modal>
                </>}
                { !mobile ? (
                <>
                <Table>
                    <BodyLine style={{ gridTemplateColumns: 'repeat(6, 1fr'}}>
                        <Item>{props.student.id}</Item>
                        <Item>{props.student.nome}</Item>
                        <Item>{props.student.email}</Item>
                        <Item>{props.student.cep}</Item>
                        <Item>{props.student.estado}</Item>
                        <Item>{props.student.cidade}</Item>
                    </BodyLine>
                </Table>
                <Table>
                    <Head style={{ gridTemplateColumns: '5fr 1fr'}}>
                        <Item>Curso</Item>
                        <Item>Ação</Item>
                    </Head>
                    <BodyLine style={{ gridTemplateColumns: '5fr 1fr'}}>
                        {studentCourses.map(curso => <>
                            <Item>{curso.nome}</Item>
                            <Item>
                                <ActionButton onClick={() => removeCourse(curso.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                </ActionButton>
                            </Item>
                        </>
                        )}
                    </BodyLine>
                </Table>
                </>
                ) : (
                    <>
                        <TableMobile>
                            <Head>
                                <Item> ID </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.id}</Item>
                            </BodyLine>
                            <Head>
                                <Item> Nome </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.nome}</Item>
                            </BodyLine>
                            <Head>
                                <Item> E-mail </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.email}</Item>
                            </BodyLine>
                            <Head>
                                <Item> CEP </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.cep}</Item>
                            </BodyLine>
                            <Head>
                                <Item> Estado </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.estado}</Item>
                            </BodyLine>
                            <Head>
                                <Item> Cidade </Item>
                            </Head>
                            <BodyLine>
                                <Item>{props.student.cidade}</Item>
                            </BodyLine>
                        </TableMobile>
                        <TableMobile style={{ gridTemplateColumns: '4fr 1fr'}}>
                            <Head>
                                <Item>Curso</Item>
                            </Head>
                            <Head>
                                <Item>Ação</Item>
                            </Head>
                                {studentCourses.map(curso => <>
                                        <BodyLine>
                                            <Item>{curso.nome}</Item>   
                                        </BodyLine>
                                        <BodyLine>
                                            <Item>
                                                <button onClick={() => removeCourse(curso.id)}>Excluir</button>
                                            </Item>
                                        </BodyLine>
                                    </>
                                )}
                        </TableMobile>
                    </>
                )}
                <ButtonsDiv>
                    <Button onClick={() => openModal()}>Adicionar Curso</Button>
                    <Button onClick={() => props.showStudentsTable()}>Voltar</Button>            
                </ButtonsDiv>
            </Container>
        </>
    )
}

export default CoursesTable;