import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PrismaClient } from '@prisma/client'

export class UserRepositoryDB implements UserRepository {
  
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }

  async save(user: User): Promise<void> {
    
    await this.prisma.user.create(
      {
        data: {
          name: user.name,
          email: user.email,
          password: user.password
        },
      }
    )
  }
}