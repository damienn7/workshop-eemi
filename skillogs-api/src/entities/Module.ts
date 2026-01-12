import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Training } from './Training';
import { Lesson } from './Lesson';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  order!: number;

  // Relations

  @ManyToOne(() => Training, (training) => training.modules)
  training!: Training;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons!: Lesson[];
}