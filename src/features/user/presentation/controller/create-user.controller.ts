import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { User } from '../../domain/entities/user';

export class CreateUserController {

  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name }: User = req.body;
      await this.createUserUseCase.execute({ email, password, name })  
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error });
    }
  }
}