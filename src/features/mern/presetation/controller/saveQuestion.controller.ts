import { Request, Response } from 'express';
import { SaveQuestionUseCase } from '../../application/use-cases/saveQuestion.use-case';


export class SaveQuestionController {
  constructor(private saveQuestionUseCase: SaveQuestionUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    try {
      await this.saveQuestionUseCase.execute(data);
      return res.status(201).send({ message: 'Save with Success' });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  }
}