import { Request, Response } from 'express';
import { GetQuestionAllUseCase } from '../../application/use-cases/getQuestionAll.use-case';


export class GetQuestionAllController {
  constructor(private getQuestionAllUseCase: GetQuestionAllUseCase) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.getQuestionAllUseCase.execute();
      return res.status(201).send({ message: response });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  }
}