import React, {Component, useState, useEffect} from 'react'

import UserForm from '@/components/Organisms/Forms/UserForm'
import StudentTable from '@/components/Organisms/Tables/StudentTable'
import LoginForm from '@/components/Organisms/Forms/LoginForm'
import CoursesTable from '@/components/Organisms/Tables/CoursesTable'

import { OptionsButton } from '@/components/Organisms/Forms/UserForm/styles'

export default function Auth() {
    const [authenticated, setAuthenticated] = useState(false)
    const [register, setRegister] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [showCourses, setShowCourses] = useState(false)
    const [student, setStudent] = useState(null)
    const [token, setToken] = useState(null)
    const msg = register ? 'Não possui conta? Clique para criar uma conta.' : 'Já possui conta? Clique para fazer login.'

    const Authenticate = (admin, token) => {
        setAuthenticated(true)
        if(admin) {
            setAdmin(true)
        }
        setToken(token)
    }

    const Register = () => {
        setRegister(true)
    }

    const showCoursesTable = student => {
        setStudent(student)
        setShowCourses(true)
    }

    const showStudentsTable = () => {
        setStudent(null)
        setShowCourses(false)
    }

   
    
    return (
        <>
            { authenticated ? 
                <>
                    { showCourses ? <CoursesTable showStudentsTable={showStudentsTable} student={student} token={token}/> : <StudentTable admin={admin}  showCoursesTable={showCoursesTable}/>} 
                </>
                    : 
                    <>
                        {register ? 
                        <LoginForm Authenticate={Authenticate}/> : <UserForm Register={Register} page='register' />}
                        <OptionsButton onClick={() => setRegister(!register)}>{msg}</OptionsButton>
                    </>
            }
        </>
    )
}