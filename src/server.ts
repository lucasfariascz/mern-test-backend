import express from 'express';
import cors from 'cors';
import { QuestionRepositoryDB } from './features/mern/infra/database/question.repository.db';
import { SaveQuestionUseCase } from './features/mern/application/use-cases/saveQuestion.use-case';
import { SaveQuestionController } from './features/mern/presetation/controller/saveQuestion.controller';
import { GetQuestionAllController } from './features/mern/presetation/controller/getQuestionAll.controller';
import { GetQuestionAllUseCase } from './features/mern/application/use-cases/getQuestionAll.use-case copy';
import { CreateUserController } from './features/user/presentation/controller/create-user.controller';
import { LoginController } from './features/login/presentation/controller/login.controller';
import authMiddleware from './middleware/auth';

const server = express();
server.use(cors());
server.use(express.json());

const questionRepository = new QuestionRepositoryDB();
const saveQuestionUseCase = new SaveQuestionUseCase(questionRepository);
const getQuestionAllUseCase = new GetQuestionAllUseCase(questionRepository);
const saveQuestionController = new SaveQuestionController(saveQuestionUseCase);
const getQuestionAllController = new GetQuestionAllController(getQuestionAllUseCase);
const createUserController = new CreateUserController()
const loginController = new LoginController()

server.post('/question', (req, res) => {
  saveQuestionController.create(req, res)
});

server.get('/question', authMiddleware, (req, res) => {
  getQuestionAllController.getAll(req, res)
});

server.post('/create-user', (req, res) => {
  createUserController.createUser(req, res)
})

server.post('/login', (req, res) => {
  loginController.login(req, res)
})

export { server };