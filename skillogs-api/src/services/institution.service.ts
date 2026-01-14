import { AppDataSource } from '../config/datasource';
import { Institution } from '../entities/Institution';

export class InstitutionService {
  private institutionRepo = AppDataSource.getRepository(Institution);

  async create(data: Partial<Institution>) {
    const institution = this.institutionRepo.create(data);
    return this.institutionRepo.save(institution);
  }

  async findAll() {
    return this.institutionRepo.find();
  }

  async findById(id: number) {
    const institution = await this.institutionRepo.findOneBy({ id });
    if (!institution) {
      throw new Error('Institution not found');
    }
    return institution;
  }

  async update(id: number, data: Partial<Institution>) {
    const institution = await this.findById(id);
    Object.assign(institution, data);
    return this.institutionRepo.save(institution);
  }

  async delete(id: number) {
    const institution = await this.findById(id);
    await this.institutionRepo.remove(institution);
    return { message: 'Institution deleted' };
  }
}