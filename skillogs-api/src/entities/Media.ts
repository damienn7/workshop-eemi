import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Lesson } from './Lesson';

import { MediaType } from '../enums/MediaType';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  type!: MediaType;

  @Column()
  url!: string;

  /**
   * Duration in seconds
   * Only relevant for VIDEO
   */
  @Column({ type: 'int', nullable: true })
  duration!: number | null;

  // Relations

  @ManyToOne(() => Lesson, (lesson) => lesson.medias)
  lesson!: Lesson;
}
