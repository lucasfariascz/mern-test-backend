import { User } from "../../../user/domain/entities/user";
import { UserRepository } from "../../../user/domain/repositories/user.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<any> {

    const existingUser = await this.userRepository.findByEmail(user.email);
    
    if (!existingUser) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(user.password, existingUser.password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: existingUser.id },
      '09ab94b19f30ca3eca25f3a8f012330b',
      { expiresIn: '24h' }
    );

    return {
      message: 'Logged in successfully',
      token,
      user: { id: existingUser.id, email: existingUser.email, name: existingUser.name }
    }
    
  }
}