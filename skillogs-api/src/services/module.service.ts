import { AppDataSource } from '../config/datasource';
import { Module } from '../entities/Module';
import { Training } from '../entities/Training';
import { Institution } from '../entities/Institution';
import { DeepPartial } from 'typeorm';

export class ModuleService {
  private moduleRepo = AppDataSource.getRepository(Module);
  private trainingRepo = AppDataSource.getRepository(Training);

  /**
   * CREATE MODULE
   */
  async create(data: {
    title: string;
    description?: string;
    order: number;
    trainingId: number;
    institution: Institution;
  }) {
    const training = await this.trainingRepo.findOne({
      where: {
        id: data.trainingId,
        institution: data.institution,
      },
    });

    if (!training) {
      throw new Error('Training not found');
    }

    const payload: DeepPartial<Module> = {
      title: data.title,
      order: data.order,
      training,
    };

    if (data.description !== undefined) {
      payload.description = data.description;
    }

    const module = this.moduleRepo.create(payload);
    return this.moduleRepo.save(module);
  }

  /**
   * LIST MODULES BY TRAINING
   */
  async findAll(trainingId: number, institution: Institution) {
    return this.moduleRepo.find({
      where: {
        training: {
          id: trainingId,
          institution,
        },
      },
      order: { order: 'ASC' },
    });
  }

  /**
   * GET ONE MODULE (scoped)
   */
  async findOne(id: number, institution: Institution) {
    return this.moduleRepo.findOne({
      where: {
        id,
        training: { institution },
      },
      relations: ['lessons'],
    });
  }

  /**
   * UPDATE MODULE
   */
  async update(
    id: number,
    institution: Institution,
    data: {
      title?: string;
      description?: string;
      order?: number;
    }
  ) {
    const module = await this.findOne(id, institution);
    if (!module) throw new Error('Module not found');

    if (data.title !== undefined) module.title = data.title;
    if (data.description !== undefined) module.description = data.description;
    if (data.order !== undefined) module.order = data.order;

    return this.moduleRepo.save(module);
  }

  /**
   * DELETE MODULE
   */
  async remove(id: number, institution: Institution) {
    const module = await this.findOne(id, institution);
    if (!module) throw new Error('Module not found');

    await this.moduleRepo.remove(module);
  }
}