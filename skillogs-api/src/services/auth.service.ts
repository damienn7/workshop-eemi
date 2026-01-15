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
import { ProfileType } from '../enums/ProfileType';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private institutionRepo = AppDataSource.getRepository(Institution);
  private requestRepo = AppDataSource.getRepository(RegistrationRequest);

  /**
   * LOGIN
   */
async login(
  email: string,
  password: string,
  institution: Institution | null
) {
  const user = await this.userRepo.findOne({
    where: { email },
    relations: ['institution'],
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  /**
   * 🌍 Domaine racine → plateforme
   */
  if (!institution) {
    if (user.role !== Role.SUPER_ADMIN) {
      throw new Error(
        'Please log in via your institution URL'
      );
    }
  }

  /**
   * 🏫 Sous-domaine → établissement
   */
  if (institution) {
    if (!user.institution || user.institution.id !== institution.id) {
      throw new Error('Invalid institution context');
    }
  }

  if (user.status !== AccountStatus.ACTIVE) {
    throw new Error('Account not active');
  }

  const isValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
    institutionId: user.institution?.id ?? null,
  });

  let redirectUrl: string | null = null;

  if (user.role !== Role.SUPER_ADMIN && user.institution) {
    redirectUrl = `https://${user.institution.slug}.skillogs.io`;
  }

  return {
    token,
    redirectUrl,
  };
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
    national_id: string;
    profile_type: ProfileType;
  }) {
    const exists = await this.userRepo.findOne({
      where: [
        { email: data.email },
        { national_id: data.national_id },
      ],
    });

    if (exists) {
      throw new Error('Email or national ID already used');
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
      national_id: data.national_id,
      password_hash,
      role: Role.LEARNER,                // sécurité
      profile_type: data.profile_type,   // métier
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