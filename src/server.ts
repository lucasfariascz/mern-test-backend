import express from 'express';
import cors from 'cors';
import { QuestionRepositoryDB } from './features/mern/infra/database/question.repository.db';
import { SaveQuestionUseCase } from './features/mern/application/use-cases/saveQuestion.use-case';
import { SaveQuestionController } from './features/mern/presetation/controller/saveQuestion.controller';

const server = express();
server.use(cors());
server.use(express.json());

const questionRepository = new QuestionRepositoryDB();
const saveQuestionUseCase = new SaveQuestionUseCase(questionRepository);
const saveQuestionController = new SaveQuestionController(saveQuestionUseCase);

server.post('/question', (req, res) => {
  saveQuestionController.create(req, res)
});

export { server };