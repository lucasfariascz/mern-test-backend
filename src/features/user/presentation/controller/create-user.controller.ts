import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export class CreateUserController {

  private readonly prisma

  constructor(){
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name } = req.body;
      
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });
  
      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error });
    }
  }
}