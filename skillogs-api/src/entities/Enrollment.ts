import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Training } from './Training';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  progress!: number;

  @CreateDateColumn()
  enrolled_at!: Date;

  // Relations

  @ManyToOne(() => User, (user) => user.enrollments)
  user!: User;

  @ManyToOne(() => Training, (training) => training.enrollments)
  training!: Training;
}
