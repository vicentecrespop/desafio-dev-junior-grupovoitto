import React, { useEffect, useState } from 'react';

import {
  Container,
  Table,
  Head,
  Item,
  BodyLine,
  Message,
  TableMobile,
  Separator,
  ModalBackground,
  Modal,
  ActionButton,
  MobileButton
} from './styles';

import { api } from '@/services/api';
import { toast } from 'react-toastify';
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from '@material-ui/core';
import { buttonTheme } from '@/utils/Config';
import StudentForm from '../../Forms/StudentForm';

const StudentTable: React.FC = props => {
  const [students, setStudents] = useState<Student[]>([]);
  const mobile = useWindowSize().width < 700;
  const [modalOpened, setModalOpened] = useState<Boolean>(false);
  const [formType, setFormType] = useState<String>('')
  const initialAluno = {
    id: null,
    nome: '',
    email: '',
    cep: '',
    estado: '',
    cidade: ''
  }
  const [aluno, setAluno] = useState<Student>(initialAluno)

  useEffect(() => {
    carregarAlunos()
  }, []);

  const openCreateStudentModal = (): void => {
    setAluno(initialAluno)
    setFormType('Adicionar')
    setModalOpened(true)
  };

  const openStudentModal = async (id: number, action: string): void => {
    await api
      .get(`alunos/${id}`)
      .then(res => setAluno(res.data))
    setFormType(action)
    setModalOpened(true)
  }

  const closeModal = (): void => {
    setModalOpened(false)
  }

  const carregarAlunos = async (): void => {
    await api
      .get('alunos')
      .then(res => {
        setStudents(res.data);
      })
      .catch(() => {
        toast('Confira a API', {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      });
  }

  const noAuthTable = props.admin ? null : { gridTemplateColumns: 'repeat(6, 1fr)' }

  return (
    <Container>
      <header>
        { props.admin ? 
          <Button
            fullWidth
            onClick={() => openCreateStudentModal()}
            color="primary"
            variant={buttonTheme}
          >
            Adicionar usuário
          </Button> : null
        }
        {modalOpened ? (
          <>
            <ModalBackground onClick={() => closeModal()} />      
            <Modal>
              <StudentForm closeModal={closeModal} carregarAlunos={carregarAlunos} formType={formType} aluno={aluno}/>
            </Modal>
          </>
        ) : null
        }
      </header>

      {students ? (
        !mobile ? (
          <>
            <Table>
              <Head style={noAuthTable}>
                <Item> ID </Item>
                <Item> Nome </Item>
                <Item> E-Mail </Item>
                <Item> cep </Item>
                <Item> estado </Item>
                <Item> cidade </Item>
                {props.admin &&
                  <>
                    <Item> EDITAR </Item>
                    <Item> EXCLUIR </Item>
                    <Item>AÇÃO</Item>
                  </> 
                }
              </Head>
              {students &&
                students.map((student, key) => (
                  <BodyLine key={key} style={noAuthTable} >
                    <Item > {student.id} </Item>
                    <Item> {student.nome} </Item>
                    <Item> {student.email} </Item>
                    <Item> {student.cep} </Item>
                    <Item> {student.estado} </Item>
                    <Item> {student.cidade} </Item>
                    {props.admin &&
                    <>
                      <Item>
                        <ActionButton
                          onClick={() => openStudentModal(student.id, 'Editar')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                          </svg>
                        </ActionButton>
                      </Item>
                      <Item>
                        <ActionButton
                          onClick={() => openStudentModal(student.id, 'Excluir')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </ActionButton>
                      </Item>
                      <Item>
                        <ActionButton onClick={() => props.showCoursesTable(student)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                          <path fill="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                        </ActionButton>
                      </Item>
                    </>
                    }
                  </BodyLine>
                ))}
            </Table>
          </>
        ) : (
          <>
            {students &&
              students.map((student, key) => (
                <TableMobile>
                  <Head>
                    <Item> ID </Item>
                  </Head>
                  <BodyLine key={'bodyId'}>
                    <Item> {student.id} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Nome </Item>
                  </Head>
                  <BodyLine key={'bodyNome'}>
                    <Item> {student.nome} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Email </Item>
                  </Head>
                  <BodyLine key={'bodyEmail'}>
                    <Item> {student.email} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Cep </Item>
                  </Head>
                  <BodyLine key={'bodyCep'}>
                    <Item> {student.cep} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Estado</Item>
                  </Head>
                  <BodyLine key={'bodyEstado'}>
                    <Item> {student.estado} </Item>
                  </BodyLine>
                  <Head>
                    <Item>Cidade </Item>
                  </Head>
                  <BodyLine key={'bodyCidade'}>
                    <Item> {student.cidade} </Item>
                  </BodyLine>
                  {props.admin && 
                  <>
                    <Head>
                      <Item>Editar </Item>
                    </Head>
                    <BodyLine>
                      <Item> 
                        <MobileButton onClick={() => openStudentModal(student.id, 'Editar')}> Editar </MobileButton>
                      </Item>
                    </BodyLine>
                    <Head>
                      <Item>Excluir </Item>
                    </Head>
                    <BodyLine>
                      <Item>
                        <MobileButton onClick={() => openStudentModal(student.id, 'Excluir')}> Excluir </MobileButton>
                      </Item>
                    </BodyLine>
                    <Head>
                      <Item>Ação </Item>
                    </Head>
                    <BodyLine>
                      <Item>
                        <MobileButton onClick={() => props.showCoursesTable(student)}> Ação </MobileButton>
                      </Item>
                    </BodyLine>
                  </>
                  }
                </TableMobile>
              ))}
          </>
        )
      ) : (
        <Message>
          <p>Você ainda não fez nenhuma alteração</p>
        </Message>
      )}
    </Container>
  );
};

export default StudentTable;
