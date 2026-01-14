import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/datasource';
import { User } from '../entities/User';
import { Institution } from '../entities/Institution';
import { Role } from '../enums/Role';
import { AccountStatus } from '../enums/AccountStatus';

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private institutionRepo = AppDataSource.getRepository(Institution);

  async createAdminForInstitution(
    institutionId: number,
    data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      national_id: string;
    }
  ) {
    const institution = await this.institutionRepo.findOneBy({
      id: institutionId,
    });

    if (!institution) {
      throw new Error('Institution not found');
    }

    const exists = await this.userRepo.findOne({
      where: [
        { email: data.email },
        { national_id: data.national_id },
      ],
    });

    if (exists) {
      throw new Error('Email or national ID already used');
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const admin = this.userRepo.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      national_id: data.national_id,
      password_hash,
      role: Role.ADMIN,
      status: AccountStatus.ACTIVE,
      institution,
    });

    return this.userRepo.save(admin);
  }
}