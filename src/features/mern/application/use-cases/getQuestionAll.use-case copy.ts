import { QuestionRepository } from '../../domain/repositories/question.repository';

export class GetQuestionAllUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(): Promise<any> {
    return await this.questionRepository.getAll();
  }
}