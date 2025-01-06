import express from 'express';
import cors from 'cors';
import { QuestionRepositoryDB } from './features/mern/infra/database/question.repository.db';
import { SaveQuestionUseCase } from './features/mern/application/use-cases/saveQuestion.use-case';
import { SaveQuestionController } from './features/mern/presetation/controller/saveQuestion.controller';
import { GetQuestionAllController } from './features/mern/presetation/controller/getQuestionAll.controller';
import { GetQuestionAllUseCase } from './features/mern/application/use-cases/getQuestionAll.use-case';
import { CreateUserController } from './features/user/presentation/controller/create-user.controller';
import { LoginController } from './features/login/presentation/controller/login.controller';
import authMiddleware from './middleware/auth';
import { UserRepositoryDB } from './features/user/infra/database/user.repository.db';
import { CreateUserUseCase } from './features/user/application/use-cases/create-user.use-case';
import { LoginUseCase } from './features/login/application/use-cases/login.use-case';

const server = express();
server.use(cors({
  origin: '*',  // Permite qualquer origem
}));
server.use(express.json());

// # Repository
const questionRepository = new QuestionRepositoryDB();
const userRepository = new UserRepositoryDB();

// # Use Case
const saveQuestionUseCase = new SaveQuestionUseCase(questionRepository);
const getQuestionAllUseCase = new GetQuestionAllUseCase(questionRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

// # Controller
const saveQuestionController = new SaveQuestionController(saveQuestionUseCase);
const getQuestionAllController = new GetQuestionAllController(getQuestionAllUseCase);
const createUserController = new CreateUserController(createUserUseCase)
const loginController = new LoginController(loginUseCase)

server.post('/api/question', (req, res) => {
  saveQuestionController.create(req, res)
});

server.get('/api/question', authMiddleware, (req, res) => {
  getQuestionAllController.getAll(req, res)
});

server.post('/api/create', (req, res) => {
  createUserController.createUser(req, res)
})

server.post('/api/login', (req, res) => {
  loginController.login(req, res)
})

export { server };