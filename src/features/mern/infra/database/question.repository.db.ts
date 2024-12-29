import { QuestionRepository } from "../../domain/repositories/question.repository";
import { PrismaClient } from '@prisma/client'

export class QuestionRepositoryDB implements QuestionRepository {

  async save(question: string): Promise<void> {
    const prisma = new PrismaClient()
    await prisma.dataEntry.create({
      data: {
        data: JSON.stringify(question)
      }
    })
  }

}