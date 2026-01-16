import { AppDataSource } from '../config/datasource';
import { Training } from '../entities/Training';
import { TrainingStatus } from '../enums/TrainingStatus';
import { Institution } from '../entities/Institution';
import { User } from '../entities/User';
import { DeepPartial } from 'typeorm';
import slugify from 'slugify';

export class TrainingService {
  private trainingRepo = AppDataSource.getRepository(Training);
  private userRepo = AppDataSource.getRepository(User);

  /**
   * CREATE TRAINING
   */
async create(data: {
    title: string;
    description: string;
    level?: string;
    institution: Institution;
    creatorId: number;
  }) {
    const creator = await this.userRepo.findOneBy({
      id: data.creatorId,
    });

    if (!creator) {
      throw new Error('Creator not found');
    }

    const baseSlug = slugify(data.title, { lower: true, strict: true });
    let slug = baseSlug;
    let index = 1;

    while (await this.trainingRepo.findOne({
      where: {
        institution: data.institution,
        slug,
      },
    })) {
      slug = `${baseSlug}-${index++}`;
    }

    const payload: DeepPartial<Training> = {
      title: data.title,
      description: data.description,
      institution: data.institution,
      creator,
      status: TrainingStatus.DRAFT,
      slug: slug
    };

    if (data.level !== undefined) {
      payload.level = data.level;
    }

    const training = this.trainingRepo.create(payload);
    return this.trainingRepo.save(training);
  }


  /**
   * LIST TRAININGS (by institution)
   */
  async findAll(institution: Institution) {
    return this.trainingRepo.find({
      where: { institution },
      relations: ['creator'],
      order: { created_at: 'DESC' },
    });
  }

  /**
   * GET ONE TRAINING (scoped)
   */
  async findOne(id: number, institution: Institution) {
    return this.trainingRepo.findOne({
      where: { id, institution },
      relations: ['modules', 'creator'],
    });
  }

  /**
   * UPDATE TRAINING
   */
  async update(
    id: number,
    institution: Institution,
    data: {
      title?: string;
      description?: string;
      level?: string;
      status?: TrainingStatus;
    }
  ) {
    const training = await this.findOne(id, institution);

    if (!training) {
      throw new Error('Training not found');
    }

    // exactOptionalPropertyTypes safe updates
    if (data.title !== undefined) {
      training.title = data.title;
    }

    if (data.description !== undefined) {
      training.description = data.description;
    }

    if (data.level !== undefined) {
      training.level = data.level;
    }

    if (data.status !== undefined) {
      training.status = data.status;
    }

    return this.trainingRepo.save(training);
  }

  /**
   * DELETE TRAINING
   */
  async remove(id: number, institution: Institution) {
    const training = await this.findOne(id, institution);

    if (!training) {
      throw new Error('Training not found');
    }

    await this.trainingRepo.remove(training);
  }
}