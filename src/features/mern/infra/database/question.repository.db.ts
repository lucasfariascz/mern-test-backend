import { QuestionRepository } from "../../domain/repositories/question.repository";
import { PrismaClient } from '@prisma/client'

export class QuestionRepositoryDB implements QuestionRepository {
  
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getAll(): Promise<any> {
    return await this.prisma.dataEntry.findMany()
  }

  async save(question: string): Promise<void> {
    
    await this.prisma.dataEntry.create(
      {
        data: {
          name: 'Example JSON Data',
          jsonContent: JSON.stringify(question),
        },
      }
    )
  }

}