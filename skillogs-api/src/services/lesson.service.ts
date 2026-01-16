import { AppDataSource } from '../config/datasource';
import { Lesson } from '../entities/Lesson';
import { Module } from '../entities/Module';
import { LessonType } from '../enums/LessonType';
import slugify from 'slugify';

export class LessonService {
  private lessonRepo = AppDataSource.getRepository(Lesson);
  private moduleRepo = AppDataSource.getRepository(Module);

  async create(data: {
    title: string;
    type: LessonType;
    order: number;
    moduleId: number;
    description?: string;
    content?: string;
    estimated_duration?: number;
  }) {
    const module = await this.moduleRepo.findOne({
      where: { id: data.moduleId },
      relations: ['lessons'],
    });

    if (!module) {
      throw new Error('Module not found');
    }

    // 🔹 Génération du slug (unique par module)
    const baseSlug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let index = 1;

    while (module.lessons?.some((l) => l.slug === slug)) {
      slug = `${baseSlug}-${index++}`;
    }

    const lesson = this.lessonRepo.create({
      title: data.title,
      type: data.type,
      ...(data.content !== undefined && {
        content: data.content,
      }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      order: data.order,
      ...(data.estimated_duration !== undefined && {
        estimated_duration: data.estimated_duration,
      }),
      slug,
      module,
    });

    return this.lessonRepo.save(lesson);
  }

  async findAllByModule(moduleId: number) {
    return this.lessonRepo.find({
      where: { module: { id: moduleId } },
      order: { order: 'ASC' },
    });
  }

  async findById(id: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['module', 'medias'],
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  }

  async findBySlug(moduleSlug: string, lessonSlug: string) {
    const lesson = await this.lessonRepo.findOne({
      where: {
        slug: lessonSlug,
        module: { slug: moduleSlug },
      },
      relations: ['medias'],
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      description?: string;
      content?: string;
      order: number;
      estimated_duration?: number;
      is_published: boolean;
    }>
  ) {
    const lesson = await this.findById(id);

    Object.assign(lesson, data);

    return this.lessonRepo.save(lesson);
  }

  async delete(id: number) {
    const lesson = await this.findById(id);
    await this.lessonRepo.remove(lesson);
    return { message: 'Lesson deleted successfully' };
  }
}