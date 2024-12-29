import { Question } from '../../domain/entities/question';
import { QuestionRepository } from '../../domain/repositories/question.repository';

export class SaveQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(question: string): Promise<void> {
    await this.questionRepository.save(question);
  }
}