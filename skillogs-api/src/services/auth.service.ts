import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/datasource';
import { User } from '../entities/User';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('Account not active');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return { token };
  }

  async register(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) {
    const exists = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw new Error('Email already used');
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password_hash,
      status: 'PENDING',
      role: 'LEARNER',
    });

    await this.userRepo.save(user);

    return { message: 'Account pending approval' };
  }

  async approve(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    user.status = 'ACTIVE';
    await this.userRepo.save(user);

    return { message: 'User approved' };
  }
}