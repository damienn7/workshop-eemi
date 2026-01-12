import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/datasource';
import { User } from '../entities/User';
import { AccountStatus } from '../enums/AccountStatus';
import { Role } from '../enums/Role';
import { Institution } from '../entities/Institution';
import { RequestStatus } from '../enums/RequestStatus';
import {
  RegistrationRequest,
} from '../entities/RegistrationRequest';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private institutionRepo = AppDataSource.getRepository(Institution);
  private requestRepo = AppDataSource.getRepository(RegistrationRequest);

  /**
   * LOGIN
   */
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== AccountStatus.ACTIVE) {
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

  /**
   * REGISTER (creates a pending user + registration request)
   */
  async register(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    institution_id: number;
    national_id?: string;
  }) {
    const exists = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw new Error('Email already used');
    }

    const institution = await this.institutionRepo.findOneBy({
      id: data.institution_id,
    });

    if (!institution) {
      throw new Error('Institution not found');
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      national_id: data.national_id ?? null,
      password_hash,
      role: Role.LEARNER,
      status: AccountStatus.PENDING,
      institution,
    });

    await this.userRepo.save(user);

    const request = this.requestRepo.create({
      user,
      status: RequestStatus.PENDING,
    });

    await this.requestRepo.save(request);

    return {
      message: 'Registration request submitted and pending approval',
    };
  }

  /**
   * APPROVE REGISTRATION (admin action)
   */
  async approveRegistration(requestId: number) {
    const request = await this.requestRepo.findOne({
      where: { id: requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new Error('Registration request not found');
    }

    request.status = RequestStatus.APPROVED;
    request.validated_at = new Date();
    request.user.status = AccountStatus.ACTIVE;

    await this.userRepo.save(request.user);
    await this.requestRepo.save(request);

    return { message: 'User approved successfully' };
  }
}