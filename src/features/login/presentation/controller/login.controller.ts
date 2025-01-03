import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

export class LoginController {

  constructor(private loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response): Promise<Response> {
    
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute({ email, password });
      return res.status(201).send({ message: result });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in', error: error });
    }
  }
}