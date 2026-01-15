import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Training } from './Training';
import { Lesson } from './Lesson';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  order!: number;

  @ManyToOne(() => Training, (training) => training.modules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  training!: Training;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons!: Lesson[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}