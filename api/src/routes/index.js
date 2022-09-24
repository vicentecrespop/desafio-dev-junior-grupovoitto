import { Router } from 'express';
import verifyToken from '../app/helpers/verifyToken';

import AlunosController from '../app/controllers/AlunoController';
import AuthController from '../app/controllers/AuthController';
import CursoController from '../app/controllers/CursoController';
import AtribuirCursoAlunoService from '../app/services/AtribuirCursoAlunoService';

const routes = new Router();

// Alunos
routes.get('/alunos', AlunosController.index);
routes.get('/alunos/:id', AlunosController.read);
routes.post('/alunos', AlunosController.create);
routes.delete('/alunos/:id', AlunosController.delete);
routes.patch('/alunos/:id', AlunosController.update);

// Users
routes.get('/users', AuthController.index);
routes.get('/users/:id', verifyToken, AuthController.read);
routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.patch('/users', verifyToken, AuthController.update);
// routes.delete('/users/:id', AuthController.delete);

// Cursos
routes.get('/cursos', CursoController.read);
routes.post('/cursos', verifyToken, CursoController.create);
routes.delete('/cursos/:id', verifyToken, CursoController.delete);

// Cursos Aluno
routes.get('/cursos/aluno/:id', AtribuirCursoAlunoService.read);
routes.post('/cursos/aluno/:id', verifyToken, AtribuirCursoAlunoService.create);
routes.delete('/cursos/aluno/:id', verifyToken, AtribuirCursoAlunoService.delete);

export default routes;
