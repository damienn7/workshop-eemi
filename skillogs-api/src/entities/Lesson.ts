import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Module } from './Module';
import { Media } from './Media';

import { LessonType } from '../enums/LessonType';

@Index(['module', 'slug'], { unique: true })
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: 'enum',
    enum: LessonType,
  })
  type!: LessonType;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'longtext', nullable: true })
  content?: string;

  @Column()
  order!: number;

  @Column({ nullable: true })
  estimated_duration?: number;

  @Column({ default: false })
  is_published!: boolean;

  @Column({ nullable: true })
  slug?: string;

  // Relations

  @ManyToOne(() => Module, (module) => module.lessons, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  module!: Module;

  @OneToMany(() => Media, (media) => media.lesson)
  medias!: Media[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
