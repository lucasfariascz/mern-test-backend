import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginController {
  async login(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        '09ab94b19f30ca3eca25f3a8f012330b',
        { expiresIn: '24h' }
      );
  
      res.json({
        message: 'Logged in successfully',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error });
    }
  }
}