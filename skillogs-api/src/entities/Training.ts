import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Module } from './Module';
import { Enrollment } from './Enrollment';
import { Institution } from './Institution';

import { TrainingStatus } from '../enums/TrainingStatus';

@Index(['institution', 'slug'], { unique: true })
@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  level?: string;

  @Index()
  @Column({ nullable: true })
  slug?: string;

  @Column({
    type: 'enum',
    enum: TrainingStatus,
    default: TrainingStatus.DRAFT,
  })
  status!: TrainingStatus;

  /* ======================
     RELATIONS
     ====================== */

  @ManyToOne(() => Institution, { nullable: false })
  institution!: Institution;

  @ManyToOne(() => User, { nullable: false })
  creator!: User;

  @OneToMany(() => Module, (module) => module.training)
  modules!: Module[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.training)
  enrollments!: Enrollment[];

  /* ======================
     METADATA
     ====================== */

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}