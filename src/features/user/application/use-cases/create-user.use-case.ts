import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import bcrypt from 'bcrypt';


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {

    const existingUser = await this.userRepository.findByEmail(user.email);
    
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword
    await this.userRepository.save(user);
  }
}