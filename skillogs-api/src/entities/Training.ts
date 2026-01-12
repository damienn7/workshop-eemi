import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Module } from './Module';
import { Enrollment } from './Enrollment';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  level!: string;

  // Relations

  @ManyToOne(() => User, (user) => user.trainings)
  creator!: User;

  @OneToMany(() => Module, (module) => module.training)
  modules!: Module[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.training)
  enrollments!: Enrollment[];
}