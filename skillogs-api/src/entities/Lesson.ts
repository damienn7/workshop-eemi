import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Module } from './Module';
import { Media } from './Media';

import { LessonType } from '../enums/LessonType';

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

  @Column()
  order!: number;

  // Relations

  @ManyToOne(() => Module, (module) => module.lessons)
  module!: Module;

  @OneToMany(() => Media, (media) => media.lesson)
  medias!: Media[];
}
