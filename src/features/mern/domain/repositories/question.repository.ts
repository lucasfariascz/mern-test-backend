import { Question } from "../entities/question";

export interface QuestionRepository {
  save(question: string): Promise<void>;
  getAll(): Promise<any>
}